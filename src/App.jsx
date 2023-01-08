import { lazy, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import CssBaseline from '@mui/material/CssBaseline';
import { apiHostState, isLightThemeState, isOnlineState, visitorIDState } from './states/main';
import { InternetChecker } from './features/internetChecker';
import { appSnackOpenState } from './states/notification';
import DashboardMenu from './pages/DashboardMenu';
import NotificationWrapper from './features/notificationWrapper';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// lazy loading
const UserSettings = lazy(() => import('./pages/UserSettings'));
const WeeklyAssignments = lazy(() => import('./pages/WeeklyAssignments'));

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

const queryClient = new QueryClient();

const App = ({ updatePwa }) => {
  const setVisitorID = useSetRecoilState(visitorIDState);
  const setApiHost = useSetRecoilState(apiHostState);

  const isOnline = useRecoilValue(isOnlineState);
  const isLight = useRecoilValue(isLightThemeState);
  const appSnackOpen = useRecoilValue(appSnackOpenState);

  const [activeTheme, setActiveTheme] = useState(darkTheme);

  const router = createBrowserRouter([
    {
      element: <Layout updatePwa={updatePwa} />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <DashboardMenu /> },
        { path: '/meeting-schedule', element: <WeeklyAssignments /> },
        { path: '/user-settings', element: <UserSettings /> },
      ],
    },
  ]);

  useEffect(() => {
    if (isLight) {
      setActiveTheme(lightTheme);
    } else {
      setActiveTheme(darkTheme);
    }
  }, [isLight]);

  useEffect(() => {
    // get visitor ID and check if there is an active connection
    const getUserID = async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: 'XwmESck7zm6PZAfspXbs',
      });

      let visitorId = '';

      do {
        const fp = await fpPromise;
        const result = await fp.get();
        visitorId = result.visitorId;
      } while (visitorId.length === 0);

      setVisitorID(visitorId);
    };

    if (isOnline) {
      getUserID();
    }
  }, [setVisitorID, isOnline]);

  useEffect(() => {
    if (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === 'development' ||
      window.location.host.indexOf('localhost') !== -1
    ) {
      if (import.meta.env.VITE_API_REMOTE_URL) {
        setApiHost(import.meta.env.VITE_API_REMOTE_URL);
      } else {
        setApiHost('http://localhost:8000/');
      }
    } else {
      setApiHost('https://sws2apps-api.onrender.com/');
    }
  }, [setApiHost]);

  useEffect(() => {
    if (!indexedDB) {
      if (!('serviceWorker' in navigator)) {
        return (
          <div className="browser-not-supported">
            You seem to use an unsupported browser to use CPE. Make sure that you browser is up to date, or try to use
            another browser.
          </div>
        );
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <InternetChecker />
        {appSnackOpen && <NotificationWrapper />}

        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
