import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import WaitingPage from './WaitingPage';

const Layout = () => {
  return (
    <>
      <NavBar />

      <Box sx={{ padding: '10px' }}>
        <Suspense fallback={<WaitingPage />}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
};

export default Layout;
