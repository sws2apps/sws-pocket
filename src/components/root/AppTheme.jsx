import { useRecoilState } from 'recoil';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { isLightThemeState } from '../../states/app';

const AppTheme = () => {
	const [isLight, setIsLight] = useRecoilState(isLightThemeState);

	return (
		<IconButton onClick={() => setIsLight(!isLight)}>
			{isLight && <Brightness4Icon />}
			{!isLight && <Brightness7Icon />}
		</IconButton>
	);
};

export default AppTheme;
