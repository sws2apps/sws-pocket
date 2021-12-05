import { lazy, Suspense, useEffect } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import usePwa2 from 'use-pwa2/dist/index.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppNotification from './components/root/AppNotification';
import Layout from './components/root/Layout';
import ServiceWorkerWrapper from './components/root/ServiceWorkerWrapper';
import Startup from './pages/Startup';
import { appSnackOpenState } from './appStates/appNotification';
import { apiHostState, isAppLoadState } from './appStates/appSettings';

// For code splitting
const Home = lazy(() => import('./pages/Home'));
const MidweekMeeting = lazy(() => import('./pages/MidweekMeeting'));
const AboutMe = lazy(() => import('./pages/AboutMe'));

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        xs420: 420,
        sm: 600,
        sm800: 800,
        md: 900,
        lg: 1280,
        xl: 1536,
      },
    },
});

const App = () => {
    const { enabledInstall, installPwa, isLoading, updatePwa } = usePwa2();
    const isAppLoad = useRecoilValue(isAppLoadState);
    const appSnackOpen = useRecoilValue(appSnackOpenState);

    const setApiHost = useSetRecoilState(apiHostState);

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            setApiHost('http://localhost:8000/')
        } else {
            setApiHost('https://sws2apps.herokuapp.com/')
        }
    }, [setApiHost])
    
    if (!indexedDB) {
        if ('serviceWorker' in navigator) {}
        else {
            return (
                <div className="browser-not-supported">Tsy afaka mampiasa ny SWS Pocket ianao amin’ity programa fijerenao internet ity. Hamarino raha mila fanavaozana ilay izy, na andramo amin’ny programa fijerena internet hafa.</div>
            )
        }
    }

    return ( 
        <ThemeProvider theme={theme}>
            <ServiceWorkerWrapper
                updatePwa={updatePwa}
            />
            {appSnackOpen && (
                <AppNotification />
            )}
            {isAppLoad && (
                <Startup />
            )}
            {!isAppLoad && (
                <Suspense fallback={<div></div>}>
                    <HashRouter>
                        <Layout
                            enabledInstall={enabledInstall}
                            isLoading={isLoading}
                            installPwa={installPwa}
                        >
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/MidweekMeeting">
                                <MidweekMeeting />
                            </Route>
                            <Route exact path="/AboutMe">
                                <AboutMe />
                            </Route>
                        </Layout>
                    </HashRouter>
                </Suspense>
            )}
        </ThemeProvider>
    );
}
 
export default App;
