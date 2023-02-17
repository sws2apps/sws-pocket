import { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import usePwa2 from 'use-pwa2/dist/index.js';
import Box from '@mui/material/Box';
import About from '../features/about';
import RootModal from './RootModal';
import { WhatsNewContent } from '../features/whatsNew';
import { AppUpdater } from '../features/updater';
import { MyAssignments } from '../features/myAssignments';
import { ScheduleAutoRefresh } from '../features/schedules';
import Startup from '../features/startup';
import NavBar from './NavBar';
import { isAboutOpenState, isAppLoadState, isOnlineState } from '../states/main';
import WaitingPage from './WaitingPage';
import { dbSaveNotifications } from '../indexedDb/dbNotifications';
import { fetchNotifications } from '../api/notification';

const Layout = ({ updatePwa }) => {
  let location = useLocation();

  const { data: announcements } = useQuery({
    queryKey: ['annoucements'],
    queryFn: fetchNotifications,
    refetchInterval: 60000,
  });

  const { enabledInstall, installPwa, isLoading } = usePwa2();

  const isAppLoad = useRecoilValue(isAppLoadState);
  const isOpenAbout = useRecoilValue(isAboutOpenState);
  const isOnline = useRecoilValue(isOnlineState);

  const checkPwaUpdate = () => {
    if ('serviceWorker' in navigator) {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
      navigator.serviceWorker.register(swUrl).then((reg) => {
        reg.update();
      });
    }
  };

  useEffect(() => {
    if (import.meta.env.PROD && isOnline) checkPwaUpdate();
  }, [isOnline, location]);

  useEffect(() => {
    if (announcements?.data?.length >= 0) dbSaveNotifications(announcements.data);
  }, [announcements]);

  return (
    <RootModal>
      <NavBar enabledInstall={enabledInstall} isLoading={isLoading} installPwa={installPwa} />
      <AppUpdater updatePwa={updatePwa} enabledInstall={enabledInstall} />

      <Box sx={{ padding: '10px' }}>
        <ScheduleAutoRefresh />
        <WhatsNewContent />

        {isOpenAbout && <About />}

        {isAppLoad && <Startup />}
        {!isAppLoad && (
          <Suspense fallback={<WaitingPage />}>
            <MyAssignments />
            <Outlet />
          </Suspense>
        )}
      </Box>
    </RootModal>
  );
};

export default Layout;
