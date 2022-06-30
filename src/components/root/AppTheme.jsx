import { useRecoilState } from 'recoil';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { isLightThemeState } from '../../states/app';

const AppTheme = () => {
	const [isLight, setIsLight] = useRecoilState(isLightThemeState);

	return (
		<IconButton
			data-testid='app-theme-switcher'
			onClick={() => setIsLight(!isLight)}
		>
			{isLight && <Brightness4Icon data-testid='app-light-icon' />}
			{!isLight && <Brightness7Icon data-testid='app-dark-icon' />}
		</IconButton>
	);
};

export default AppTheme;
