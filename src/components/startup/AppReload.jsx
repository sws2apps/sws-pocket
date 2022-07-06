import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import Layout from './Layout';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
import Typography from '@mui/material/Typography';
import { isOnlineState } from '../../states/app';

const AppReload = ({ enableInternet }) => {
	const { t } = useTranslation();

	const isOnline = useRecoilValue(isOnlineState);

	useEffect(() => {
		if (isOnline) {
			setTimeout(() => {
				window.location.reload();
			}, [10000]);
		}
	}, [isOnline]);

	useEffect(() => {
		if (!enableInternet) {
			setTimeout(() => {
				window.location.reload();
			}, [10000]);
		}
	}, [enableInternet]);

	return (
		<Layout>
			{enableInternet && (
				<Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
					<SignalWifiConnectedNoInternet4Icon
						sx={{ fontSize: '40px', marginRight: '10px' }}
					/>
					<Typography>{t('noInternet')}</Typography>
				</Box>
			)}
			{!enableInternet && (
				<Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
					<ErrorIcon
						color='error'
						sx={{ fontSize: '40px', marginRight: '10px' }}
					/>
					<Typography>{t('serverError')}</Typography>
				</Box>
			)}
		</Layout>
	);
};

export default AppReload;
