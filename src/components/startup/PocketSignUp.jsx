import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from './Layout';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
	apiHostState,
	isAppLoadState,
	isOnlineState,
	visitorIDState,
} from '../../states/app';
import {
	appMessageState,
	appSeverityState,
	appSnackOpenState,
} from '../../states/notification';
import { initAppDb } from '../../indexedDb/utils';
import { dbUpdateSettings } from '../../indexedDb/appSettings';

const PocketSignUp = () => {
	const abortCont = useRef();

	const { t } = useTranslation();

	const setAppSnackOpen = useSetRecoilState(appSnackOpenState);
	const setAppSeverity = useSetRecoilState(appSeverityState);
	const setAppMessage = useSetRecoilState(appMessageState);
	const setIsAppLoad = useSetRecoilState(isAppLoadState);

	const isOnline = useRecoilValue(isOnlineState);
	const apiHost = useRecoilValue(apiHostState);
	const visitorID = useRecoilValue(visitorIDState);

	const [verifyCode, setVerifyCode] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);

	const handleVerifyCodeChange = (value) => {
		if (value.length > 10) {
			return;
		}

		setVerifyCode(value.toUpperCase());
	};

	const handleSignUp = async () => {
		try {
			if (verifyCode.length === 0) {
				setAppMessage(t('signupCodeRequired'));
				setAppSeverity('warning');
				setAppSnackOpen(true);
				return;
			}

			abortCont.current = new AbortController();

			if (apiHost !== '') {
				setIsProcessing(true);

				const res = await fetch(`${apiHost}api/sws-pocket/signup`, {
					signal: abortCont.current.signal,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ otp_code: verifyCode, visitorid: visitorID }),
				});

				const data = await res.json();

				if (res.status === 200) {
					await initAppDb();
					await dbUpdateSettings(data);

					setIsProcessing(false);
					setIsAppLoad(false);
					return;
				}

				setIsProcessing(false);
				setAppMessage(data.message);
				setAppSeverity('warning');
				setAppSnackOpen(true);
			}
		} catch (err) {
			if (!abortCont.current.signal.aborted) {
				setIsProcessing(false);
				setAppMessage(err.message);
				setAppSeverity('error');
				setAppSnackOpen(true);
			}
		}
	};

	useEffect(() => {
		return () => {
			if (abortCont.current) {
				abortCont.current.abort();
			}
		};
	}, [abortCont]);

	return (
		<Layout>
			<Box sx={{ margin: '10px' }}>
				<Typography align='center' sx={{ fontSize: '14px' }}>
					{t('welcomeSetup')}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '15px',
					}}
				>
					<TextField
						id='txt-verification-code'
						variant='outlined'
						size='small'
						autoComplete='off'
						required
						autoFocus
						value={verifyCode}
						sx={{
							width: '200px',
							'.MuiInputBase-input': {
								fontSize: '20px',
								textAlign: 'center',
							},
						}}
						InputProps={{
							readOnly: isProcessing,
						}}
						onChange={(e) => handleVerifyCodeChange(e.target.value)}
					/>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				{isProcessing && (
					<CircularProgress
						color='secondary'
						size={40}
						disableShrink={true}
						sx={{
							margin: '10px auto',
						}}
					/>
				)}
				{!isProcessing && (
					<Button
						data-testid='btn-sign-in'
						variant='contained'
						disabled={!isOnline || visitorID === ''}
						onClick={handleSignUp}
					>
						{t('signIn')}
					</Button>
				)}
			</Box>
		</Layout>
	);
};

export default PocketSignUp;
