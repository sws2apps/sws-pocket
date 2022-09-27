import { useEffect, useState } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import TranslateIcon from '@mui/icons-material/Translate';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { langList } from '../../locales/langList';

const AppLanguage = ({ isStartup }) => {
	const { t, i18n } = useTranslation();

	const [anchorEl, setAnchorEl] = useState(null);
	const [appLangLocal, setAppLangLocal] = useState('E');
	const [userChange, setUserChange] = useState(false);

	const blueColor = blue[500];

	const theme = useTheme();
	const largeView = useMediaQuery(theme.breakpoints.up('md'), {
		noSsr: true,
	});

	let isMenuOpen = Boolean(anchorEl);

	const handleLangChange = async (e) => {
		setUserChange(true);
		const app_lang = e.target.parentElement.dataset.code;
		setAppLangLocal(app_lang);
		handleClose();
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const updateLang = async () => {
			if (userChange) {
				await i18n.changeLanguage(appLangLocal);

				const isoLang =
					getI18n().getDataByLanguage(appLangLocal).translation['languageISO'];
				document.documentElement.setAttribute('lang', isoLang);

				localStorage.setItem('app_lang', appLangLocal);
				setUserChange(false);
			} else {
				let appLang = localStorage.getItem('app_lang') || 'E';
				await i18n.changeLanguage(appLang);

				const isoLang =
					getI18n().getDataByLanguage(appLang).translation['languageISO'];
				document.documentElement.setAttribute('lang', isoLang);
			}
		};

		updateLang();
	}, [appLangLocal, i18n, userChange]);

	return (
		<>
			<Tooltip title={largeView ? '' : t('language')}>
				<IconButton
					data-testid='app-language-dropdown'
					color='inherit'
					edge='start'
					sx={{
						backgroundColor: isStartup ? blueColor : null,
						borderRadius: '8px',
						'.MuiTouchRipple-ripple .MuiTouchRipple-child': {
							borderRadius: 0,
							backgroundColor: 'rgba(23, 32, 42, .3)',
						},
						marginRight: isStartup ? '' : '10px',
					}}
					onClick={handleClick}
				>
					<TranslateIcon sx={{ fontSize: isStartup ? null : '25px' }} />
					{largeView && (
						<Typography
							data-testid='app-language-dropdownText'
							sx={{ marginLeft: '5px', fontSize: '14px' }}
						>
							{t('language')}
						</Typography>
					)}
				</IconButton>
			</Tooltip>
			<Menu
				id='menu-language'
				disableScrollLock={true}
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={handleClose}
				sx={{ padding: 0 }}
				data-testid='app-language-menus'
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{langList.map((lang) => (
					<MenuItem
						key={lang.code}
						onClick={handleLangChange}
						sx={{ padding: 0 }}
						data-testid={`app-language-${lang.code}`}
					>
						<ListItemText data-code={lang.code}>
							<Typography sx={{ padding: '6px 16px' }}>{lang.name}</Typography>
						</ListItemText>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default AppLanguage;
