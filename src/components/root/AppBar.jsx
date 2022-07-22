import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import AppLanguage from './AppLanguage';
import AppTheme from './AppTheme';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { themeOptionsState } from '../../states/theme';
import { dbGetAppSettings } from '../../indexedDb/appSettings';
import { appStageState, isAboutOpenState } from '../../states/app';

const drawerWidth = 240;

const sharedStyles = {
	borderRadius: '8px',
	'.MuiTouchRipple-ripple .MuiTouchRipple-child': {
		borderRadius: 0,
		backgroundColor: 'rgba(23, 32, 42, .3)',
	},
	color: 'white',
};

const menuLeft = {
	...sharedStyles,
	marginRight: '25px',
};

const activeMenu = {
	...menuLeft,
	backgroundColor: 'rgba(133, 193, 233, .3)',
};

const activeMobileMenu = {
	backgroundColor: 'rgba(133, 193, 233, .3)',
};

const textIcon = {
	marginLeft: '5px',
	marginTop: '3px',
};

const ApplicationBar = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const setIsAboutOpen = useSetRecoilState(isAboutOpenState);

	const appStage = useRecoilValue(appStageState);
	const themeOptions = useRecoilValue(themeOptionsState);

	const [username, setUsername] = useState('');
	const [congInfo, setCongInfo] = useState('');
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeLink, setActiveLink] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const upMd = useMediaQuery(theme.breakpoints.up('md'), {
		noSsr: true,
	});

	const upLg = useMediaQuery(theme.breakpoints.up('lg'), {
		noSsr: true,
	});

	const appMenus = [
		{
			text: t('navSchedule'),
			link: '/',
			icon: <CalendarMonthIcon />,
		},
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMyAccount = () => {
		handleClose();
		navigate('/account');
	};

	const handleAbout = () => {
		handleClose();
		setIsAboutOpen(true);
	};

	useEffect(() => {
		const currentPath = location.pathname.toLowerCase();

		if (currentPath === '/') {
			setActiveLink(t('navSchedule'));
			return;
		}

		if (currentPath === '/assignments') {
			setActiveLink(t('navAssignments'));
			return;
		}

		setActiveLink('');
	}, [t, location.pathname]);

	useEffect(() => {
		const getSettings = async () => {
			const { username, cong_name, cong_number } = await dbGetAppSettings();

			setUsername(username);
			setCongInfo(`${cong_name} (${cong_number})`);
		};

		getSettings();
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				position='fixed'
				sx={{
					backgroundColor: themeOptions.navBar,
					zIndex: (theme) => theme.zIndex.drawer + 1,
					height: '50px !important',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Toolbar
					sx={{
						height: '50px !important',
						paddingLeft: '0px !important',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '40px',
							}}
						>
							<img
								src='./img/appLogo.png'
								alt='App Logo'
								style={{
									width: 'auto',
									height: '50px',
									borderRadius: '4px',
									marginRight: '5px',
									cursor: upLg ? '' : 'pointer',
								}}
								onClick={upLg ? null : () => setMobileOpen(true)}
							/>
							<Typography noWrap sx={{ fontSize: '18px' }}>
								SWS Pocket
							</Typography>
						</Box>
						{upLg && (
							<Box>
								{appMenus.map((menu, index) => (
									<IconButton
										key={`menu-${index}`}
										sx={activeLink === menu.text ? activeMenu : menuLeft}
										component={Link}
										to={menu.link}
									>
										{menu.icon}
										<Typography sx={textIcon}>{menu.text}</Typography>
									</IconButton>
								))}
							</Box>
						)}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{appStage !== 'LIVE' && (
							<Typography
								sx={{
									display: 'flex',
									alignItems: 'center',
									backgroundColor: '#F5EEF8',
									padding: '2px 10px 2px 10px',
									height: '25px',
									color: '#EC7063',
									borderRadius: '5px',
									fontSize: '12px',
									fontWeight: 'bold',
									marginRight: '20px',
								}}
							>
								{upLg ? appStage : appStage.substring(0, 1).toUpperCase()}
							</Typography>
						)}
						<AppTheme override={true} />
						<AppLanguage />
						<IconButton
							sx={sharedStyles}
							onClick={handleMenu}
							id='button-account'
							aria-controls={open ? 'menu-account' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							{upLg && (
								<Box sx={{ marginRight: '5px' }}>
									<Typography
										sx={{
											marginLeft: '5px',
											textAlign: 'right',
											fontSize: '12px',
										}}
									>
										{username}
									</Typography>
									<Typography
										sx={{
											marginLeft: '5px',
											textAlign: 'right',
											fontSize: '12px',
										}}
									>
										{congInfo}
									</Typography>
								</Box>
							)}
							<AccountCircle sx={{ fontSize: '30px', color: 'white' }} />
						</IconButton>

						<Menu
							sx={{ marginTop: '40px' }}
							id='menu-account'
							MenuListProps={{
								'aria-labelledby': 'button-account',
							}}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleMyAccount}>
								<ListItemIcon>
									<SettingsIcon fontSize='medium' sx={{ color: '#EC7063' }} />
								</ListItemIcon>
								<ListItemText>{t('myAccount')}</ListItemText>
							</MenuItem>
							<MenuItem onClick={handleAbout}>
								<ListItemIcon>
									<InfoIcon fontSize='medium' sx={{ color: '#3498DB' }} />
								</ListItemIcon>
								<ListItemText>{t('about')}</ListItemText>
							</MenuItem>
							{!upLg && (
								<MenuItem disabled={true} sx={{ opacity: '1 !important' }}>
									<Box
										sx={{
											borderTop: '1px outset',
											paddingTop: '5px',
											width: '280px',
										}}
									>
										<Typography
											sx={{
												marginLeft: '5px',
												textAlign: 'right',
												fontSize: '12px',
											}}
										>
											{username}
										</Typography>
										<Typography
											sx={{
												marginLeft: '5px',
												textAlign: 'right',
												fontSize: '12px',
											}}
										>
											{congInfo}
										</Typography>
									</Box>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>

			{!upLg && (
				<Box
					component='nav'
					sx={{
						'@media screen and (min-width: 960px)': {
							width: drawerWidth,
							flexShrink: 0,
						},
					}}
				>
					<Drawer
						variant='temporary'
						anchor='left'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						onClick={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							zIndex: (theme) => theme.zIndex.drawer + 2,
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								backgroundColor: '#3f51b5',
								height: 50,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									color: 'white',
								}}
							>
								<img
									src='./img/appLogo.png'
									alt='App Logo'
									style={{
										width: 'auto',
										height: '50px',
										borderRadius: '4px',
									}}
								/>
								<Typography sx={{ marginLeft: '10px', fontSize: '18px' }}>
									SWS Pocket
								</Typography>
							</Box>
							<IconButton sx={{ marginRight: '5px' }}>
								<CloseIcon sx={{ color: 'white' }} />
							</IconButton>
						</Box>
						<List>
							{!upMd && (
								<ListItem
									button
									component={Link}
									to={'/assignments'}
									sx={
										activeLink === t('navAssignments') ? activeMobileMenu : {}
									}
								>
									<ListItemIcon>
										<AccountBoxIcon />
									</ListItemIcon>
									<ListItemText primary={t('navAssignments')} />
								</ListItem>
							)}
							{appMenus.map((menu, index) => (
								<ListItem
									key={`mobile-menu-${index}`}
									button
									component={Link}
									to={menu.link}
									sx={activeLink === menu.text ? activeMobileMenu : {}}
								>
									<ListItemIcon>{menu.icon}</ListItemIcon>
									<ListItemText primary={menu.text} />
								</ListItem>
							))}
						</List>
					</Drawer>
				</Box>
			)}
		</Box>
	);
};

export default ApplicationBar;
