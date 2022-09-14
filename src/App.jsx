import { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import usePwa2 from 'use-pwa2/dist/index.js';
import ApplicationLifeCycle from './components/root/ApplicationLifeCycle';
import AppNotification from './components/root/AppNotification';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import InternetChecker from './components/root/InternetChecker';
import Layout from './components/root/Layout';
import Startup from './components/startup/Startup';
import {
	apiHostState,
	appStageState,
	isAppLoadState,
	isLightThemeState,
} from './states/app';
import { appSnackOpenState } from './states/notification';

// lazy pages import
const Assignments = lazy(() => import('./pages/Assignments'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const Schedule = lazy(() => import('./pages/Schedule'));

// creating theme
const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = ({ updatePwa }) => {
	const { enabledInstall } = usePwa2();

	const isLight = useRecoilValue(isLightThemeState);
	const isAppLoad = useRecoilValue(isAppLoadState);
	const appSnackOpen = useRecoilValue(appSnackOpenState);

	const [browserSupported, setBrowserSupported] = useState(true);
	const [activeTheme, setActiveTheme] = useState(lightTheme);

	const setApiHost = useSetRecoilState(apiHostState);
	const setAppStage = useSetRecoilState(appStageState);

	useEffect(() => {
		if (import.meta.env.DEV) {
			setApiHost('http://localhost:8000/');
			setAppStage('local');
		} else {
			const appUrl = window.location.hostname;
			if (appUrl === 'localhost') {
				setApiHost('http://localhost:8000/');
				setAppStage('local');
			} else if (
				appUrl === 'alpha-sws-pocket.web.app' ||
				appUrl === 'alpha-sws-pocket.firebaseapp.com'
			) {
				setApiHost('https://alpha-sws2apps-api.onrender.com/');
				setAppStage('ALPHA Release');
			} else if (
				appUrl === 'beta-sws-pocket.web.app' ||
				appUrl === 'beta-sws-pocket.firebaseapp.com'
			) {
				setApiHost('https://beta-sws2apps-api.onrender.com/');
				setAppStage('BETA Release');
			} else if (
				appUrl === 'sws-pocket.web.app' ||
				appUrl === 'sws-pocket.firebaseapp.com'
			) {
				setApiHost('https://sws2apps-api.onrender.com/');
			}
		}
	}, [setApiHost, setAppStage]);

	useEffect(() => {
		if (isLight) {
			setActiveTheme(lightTheme);
		} else {
			setActiveTheme(darkTheme);
		}
	}, [isLight]);

	useEffect(() => {
		if (!indexedDB) {
			if ('serviceWorker' in navigator) {
			} else {
				setBrowserSupported(false);
			}
		}
	}, []);

	if (!browserSupported) {
		return (
			<div className='browser-not-supported'>
				You seem to use an unsupported browser to use SWS Pocket. Make sure that
				you browser is up to date, or try to use another browser.
			</div>
		);
	}

	return (
		<ThemeProvider theme={activeTheme}>
			<CssBaseline />
			<Box>
				<InternetChecker />
				<ApplicationLifeCycle
					enabledInstall={enabledInstall}
					updatePwa={updatePwa}
				/>
				{appSnackOpen && <AppNotification />}
				{isAppLoad && <Startup />}
				{!isAppLoad && (
					<Suspense fallback={<div></div>}>
						<HashRouter>
							<Layout>
								<Routes>
									<Route path='/' element={<Schedule />} />
									<Route path='/assignments' element={<Assignments />} />
									<Route path='/account' element={<MyAccount />} />
								</Routes>
							</Layout>
						</HashRouter>
					</Suspense>
				)}
			</Box>
		</ThemeProvider>
	);
};

export default App;
