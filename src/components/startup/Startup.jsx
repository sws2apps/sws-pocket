import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import LinearProgressWithLabel from '../reusable/LinearProgressWithLabel';
import { isSetupState, startupProgressState } from '../../states/app';
import { isDbExist } from '../../indexedDb/utils';
import PocketSignUp from './PocketSignUp';

const Startup = () => {
	const [isSetup, setIsSetup] = useRecoilState(isSetupState);
	const [startupProgress, setStartupProgress] =
		useRecoilState(startupProgressState);

	const checkDb = useCallback(async () => {
		const isExist = await isDbExist();
		setIsSetup(!isExist);
	}, []);

	useEffect(() => {
		checkDb();
	}, [checkDb]);

	if (isSetup) {
		return <PocketSignUp />;
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
