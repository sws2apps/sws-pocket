import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';
import { apiHostState, isOnlineState, visitorIDState } from '../../states/app';
import { appMessageState, appSeverityState, appSnackOpenState } from '../../states/notification';
import { dbUpdateSchedule } from '../../indexedDb/appSchedule';

const ScheduleUpdater = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);

  const setAppSnackOpen = useSetRecoilState(appSnackOpenState);
  const setAppSeverity = useSetRecoilState(appSeverityState);
  const setAppMessage = useSetRecoilState(appMessageState);

  const isOnline = useRecoilValue(isOnlineState);
  const apiHost = useRecoilValue(apiHostState);
  const visitorID = useRecoilValue(visitorIDState);

  useEffectOnce(() => {
    const abortCont = new AbortController();

    const refreshSchedule = async () => {
      try {
        abortCont.current = new AbortController();
        if (open && isOnline && apiHost !== '') {
          setOpen(true);

          const res = await fetch(`${apiHost}api/sws-pocket/schedule`, {
            signal: abortCont.signal,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              visitorid: visitorID,
            },
          });

          const data = await res.json();

          if (res.status === 200) {
            await dbUpdateSchedule(data);
            setOpen(false);
            return;
          }

          setOpen(false);
          setAppMessage(data.message);
          setAppSeverity('warning');
          setAppSnackOpen(true);
        }
      } catch (err) {
        if (abortCont.signal.aborted) {
          setOpen(false);
          setAppMessage(err.message);
          setAppSeverity('error');
          setAppSnackOpen(true);
        }
      }
    };

    refreshSchedule();

    return () => {
      console.log('unmount');
      abortCont.abort();
    };
  }, [apiHost, isOnline, open, setAppMessage, setAppSeverity, setAppSnackOpen, setOpen, visitorID]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
        alignItems: 'center',
        marginRight: '10px',
        height: '40px',
      }}
    >
      {open && (
        <>
          <Typography sx={{ marginRight: '10px', fontSize: '12px' }}>{t('scheduleRefreshProgress')}</Typography>
          <CircularProgress disableShrink color='secondary' size={'20px'} />
        </>
      )}
      {!open && (
        <IconButton onClick={() => setOpen(true)}>
          <RefreshIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ScheduleUpdater;
