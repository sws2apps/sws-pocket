import { useRecoilState } from 'recoil';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { isLightThemeState } from '../../states/app';

const AppTheme = ({ override }) => {
	const [isLight, setIsLight] = useRecoilState(isLightThemeState);

	const handleChangeTheme = () => {
		localStorage.setItem('theme', isLight ? 'dark' : 'light');
		setIsLight(!isLight);
	};

	const styles = {
		color: `${override ? 'white' : null}`,
		fontSize: `${override ? '30px' : null}`,
	};

	return (
		<IconButton
			data-testid='app-theme-switcher'
			onClick={handleChangeTheme}
			sx={
				override
					? {
							borderRadius: '8px',
							'.MuiTouchRipple-ripple .MuiTouchRipple-child': {
								borderRadius: 0,
								backgroundColor: 'rgba(23, 32, 42, .3)',
							},
							marginRight: '20px',
					  }
					: {}
			}
		>
			{isLight && <Brightness4Icon sx={styles} data-testid='app-light-icon' />}
			{!isLight && <Brightness7Icon sx={styles} data-testid='app-dark-icon' />}
		</IconButton>
	);
};

export default AppTheme;
