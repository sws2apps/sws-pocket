import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppLanguage from '../root/AppLanguage';
import { isOnlineState, visitorIDState } from '../../states/app';
import AppTheme from '../root/AppTheme';
import { themeOptionsState } from '../../states/theme';

const PocketSignUp = () => {
	const { t } = useTranslation();

	const [visitorID, setVisitorID] = useRecoilState(visitorIDState);

	const isOnline = useRecoilValue(isOnlineState);
	const themeOptions = useRecoilValue(themeOptionsState);

	const [verifyCode, setVerifyCode] = useState('');

	const handleVerifyCodeChange = (value) => {
		if (value.length > 10) {
			return;
		}

		setVerifyCode(value.toUpperCase());
	};

	useEffect(() => {
		// get visitor ID and check if there is an active connection
		const getUserID = async () => {
			const fpPromise = FingerprintJS.load({
				apiKey: 'XwmESck7zm6PZAfspXbs',
			});

			let visitorId = '';

			do {
				const fp = await fpPromise;
				const result = await fp.get();
				visitorId = result.visitorId;
			} while (visitorId.length === 0);

			setVisitorID(visitorId);
		};

		if (isOnline) {
			getUserID();
		}
	}, [setVisitorID, isOnline]);

	return (
		<Box data-testid='pocket-sign-up'>
			<Box
				sx={{
					position: 'absolute',
					right: 10,
					display: 'flex',
				}}
			>
				<Box sx={{ marginRight: '20px' }}>
					<AppTheme />
				</Box>
				<AppLanguage isStartup />
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: {
						xs: 'auto',
						sm: '90vh',
					},
					marginTop: {
						xs: '5px',
						sm: '',
					},
				}}
			>
				<Box
					sx={{
						margin: 'auto',
						border: {
							xs: 'none',
							sm: '2px solid #BFC9CA',
						},
						width: {
							xs: '90%',
							sm: '400px',
						},
						display: 'flex',
						justifyContent: 'center',
						padding: '10px',
						borderRadius: '10px',
						flexDirection: 'column',
						marginTop: {
							xs: '50px',
							sm: '',
						},
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<img
							src='img/appLogo.png'
							alt='App logo'
							className={'appLogoStartup'}
						/>
						<Typography sx={{ marginTop: '5px', fontWeight: 'bold' }}>
							SWS Pocket
						</Typography>
					</Box>
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
								onChange={(e) => handleVerifyCodeChange(e.target.value)}
							/>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							data-testid='btn-sign-in'
							variant='contained'
							disabled={!isOnline || visitorID === ''}
						>
							{t('signIn')}
						</Button>
					</Box>
					<Typography
						sx={{
							marginTop: '10px',
							borderTop: '1px outset',
							fontSize: '12px',
							fontWeight: 'bold',
							color: themeOptions.textNotImportant,
							paddingTop: '2px',
						}}
					>
						{`v${VITE_APP_VERSION}`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default PocketSignUp;
