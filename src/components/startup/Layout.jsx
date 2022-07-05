import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { themeOptionsState } from '../../states/theme';
import AppLanguage from '../root/AppLanguage';
import AppTheme from '../root/AppTheme';

const Layout = ({ children }) => {
	const themeOptions = useRecoilValue(themeOptionsState);

	return (
		<Box>
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
					{children}
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
						{`v${import.meta.env.PACKAGE_VERSION}`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;
