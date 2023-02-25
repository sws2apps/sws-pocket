import { useEffect, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import Notice from './pages/Notice';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { isLightThemeState } from './states/main';

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
  const isLight = useRecoilValue(isLightThemeState);

  const [activeTheme, setActiveTheme] = useState(darkTheme);

  const router = createHashRouter([
    {
      element: <Layout updatePwa={updatePwa} />,
      errorElement: <ErrorBoundary />,
      children: [{ index: true, element: <Notice /> }],
    },
  ]);

  useEffect(() => {
    if (isLight) {
      setActiveTheme(lightTheme);
    } else {
      setActiveTheme(darkTheme);
    }
  }, [isLight]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
