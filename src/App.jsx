import { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import usePwa2 from 'use-pwa2/dist/index.js';
import ApplicationLifeCycle from './components/root/ApplicationLifeCycle';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import InternetChecker from './components/root/InternetChecker';
import Startup from './components/startup/Startup';
import { isAppLoadState, isLightThemeState } from './states/app';

// lazy pages import
const Home = lazy(() => import('./pages/Home'));

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
	const { enabledInstall, installPwa, isLoading } = usePwa2();

	const isLight = useRecoilValue(isLightThemeState);
	const isAppLoad = useRecoilValue(isAppLoadState);

	const [browserSupported, setBrowserSupported] = useState(true);
	const [activeTheme, setActiveTheme] = useState(lightTheme);

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
				{isAppLoad && <Startup />}
				{!isAppLoad && (
					<Suspense fallback={<div></div>}>
						<HashRouter>
							<Routes>
								<Route path='/' element={<Home />} />
							</Routes>
						</HashRouter>
					</Suspense>
				)}
			</Box>
		</ThemeProvider>
	);
};

export default App;
