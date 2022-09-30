import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import AppReload from './AppReload';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import Box from '@mui/material/Box';
import LinearProgressWithLabel from '../reusable/LinearProgressWithLabel';
import PocketSignUp from './PocketSignUp';
import {
	apiHostState,
	isAppLoadState,
	isOnlineState,
	isSetupState,
	startupProgressState,
	visitorIDState,
} from '../../states/app';
import {
	deleteAppDb,
	initAppDb,
	isDbExist,
	loadAppData,
} from '../../indexedDb/utils';
import { dbUpdateSettings } from '../../indexedDb/appSettings';

const Startup = () => {
	const abortCont = useRef();

	const [isSetup, setIsSetup] = useRecoilState(isSetupState);
	const [startupProgress, setStartupProgress] =
		useRecoilState(startupProgressState);

	const setIsAppLoad = useSetRecoilState(isAppLoadState);
	const setVisitorID = useSetRecoilState(visitorIDState);

	const isOnline = useRecoilValue(isOnlineState);
	const apiHost = useRecoilValue(apiHostState);

	const [isReload, setIsReload] = useState(false);
	const [enableInternet, setEnableInternet] = useState(false);

	const getVisitorID = useCallback(async () => {
		const fpPromise = FingerprintJS.load({
			apiKey: 'XwmESck7zm6PZAfspXbs',
		});

		let visitorId = '';

		do {
			const fp = await fpPromise;
			const result = await fp.get();
			visitorId = result.visitorId;
		} while (visitorId.length === 0);

		return visitorId;
	}, []);

	const handleInitApp = useCallback(async () => {
		const isDatabaseExist = await isDbExist();
		try {
			abortCont.current = new AbortController();

			setStartupProgress(10);

			if (isOnline) {
				const visitorId = await getVisitorID();
				setStartupProgress(20);

				const res = await fetch(`${apiHost}api/sws-pocket/validate-me`, {
					signal: abortCont.current.signal,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						visitorid: visitorId,
					},
				});
				setStartupProgress(30);

				const data = await res.json();
				setStartupProgress(40);

				setVisitorID(visitorId);

				if (res.status === 200) {
					// create a new database
					if (!isDatabaseExist) {
						await initAppDb();
						setStartupProgress(50);
					}

					// update pocket settings
					await dbUpdateSettings(data);
					setStartupProgress(60);

					// load app data
					await loadAppData();
					setStartupProgress(70);

					setStartupProgress(100);

					setIsAppLoad(false);
					return;
				}

				if (res.status === 403) {
					// delete database if it exists
					if (isDatabaseExist) {
						setStartupProgress(50);

						await deleteAppDb();
					}

					setStartupProgress(100);
					setIsSetup(true);
					return;
				}

				// fallback to offline before reloading
				if (isDatabaseExist) {
					await loadAppData();
					setStartupProgress(100);
					setIsAppLoad(false);
					return;
				}

				// server warning message
				setIsReload(true);
				return;
			}

			// we are offline, fallback to offline database if exists
			if (isDatabaseExist) {
				await loadAppData();
				setStartupProgress(100);
				setIsAppLoad(false);
				return;
			}

			// database not found and ask the user to enabled internet
			setEnableInternet(true);
			setIsReload(true);
		} catch (err) {
			// we are offline, fallback to offline database if exists
			if (isDatabaseExist) {
				await loadAppData();
				setStartupProgress(100);
				setIsAppLoad(false);
				return;
			}

			setIsReload(true);
		}
	}, [
		abortCont,
		apiHost,
		isOnline,
		getVisitorID,
		setIsAppLoad,
		setIsSetup,
		setStartupProgress,
		setVisitorID,
	]);

	useEffect(() => {
		if (apiHost !== '') {
			handleInitApp();
		}
	}, [apiHost, handleInitApp]);

	useEffect(() => {
		return () => {
			if (abortCont.current) {
				abortCont.current.abort();
			}
		};
	}, [abortCont]);

	if (isSetup) {
		return <PocketSignUp />;
	}

	if (isReload) {
		return <AppReload enableInternet={enableInternet} />;
	}

	return (
		<div className='app-splash-screen'>
			<div className='app-logo-container'>
				<img src='/img/appLogo.png' alt='App logo' className='appLogo' />
			</div>
			<Box sx={{ width: '280px', marginTop: '10px' }}>
				<LinearProgressWithLabel value={startupProgress} />
			</Box>
		</div>
	);
};

export default Startup;
