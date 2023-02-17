import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  isAppLoadState,
  isFetchingScheduleState,
  isOnlineState,
  isSetupState,
  isUnauthorizedRoleState,
  isUserSignUpState,
  visitorIDState,
} from '../../states/main';
import { appMessageState, appSeverityState, appSnackOpenState } from '../../states/notification';
import { getCurrentWeekDate, getErrorMessage, loadApp } from '../../utils/app';
import { dbUpdateUserSettings } from '../../indexedDb/dbAppSettings';
import { congAccountConnectedState } from '../../states/congregation';
import { apiPocketSignUp } from '../../api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const setIsSetup = useSetRecoilState(isSetupState);
  const setAppSnackOpen = useSetRecoilState(appSnackOpenState);
  const setAppSeverity = useSetRecoilState(appSeverityState);
  const setAppMessage = useSetRecoilState(appMessageState);
  const setIsUnauthorizedRole = useSetRecoilState(isUnauthorizedRoleState);
  const setIsSignUp = useSetRecoilState(isUserSignUpState);
  const setCongAccountConnected = useSetRecoilState(congAccountConnectedState);
  const setIsAppLoad = useSetRecoilState(isAppLoadState);

  const isOnline = useRecoilValue(isOnlineState);
  const visitorID = useRecoilValue(visitorIDState);
  const isFetchingSchedule = useRecoilValue(isFetchingScheduleState);

  const [code, setCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignUp = async () => {
    try {
      if (code.length < 10) {
        setAppMessage(getErrorMessage('INPUT_INVALID'));
        setAppSeverity('warning');
        setAppSnackOpen(true);
        return;
      }

      setIsProcessing(true);
      const { status, data } = await apiPocketSignUp(code);

      if (status === 200) {
        const { cong_role } = data;
        if (cong_role.includes('view_meeting_schedule')) {
          await loadApp();
          await dbUpdateUserSettings(data);
          setIsSetup(false);
          setTimeout(async () => {
            setCongAccountConnected(true);
          }, [1000]);
        } else {
          setIsSignUp(false);
          setIsUnauthorizedRole(true);
        }
      } else {
        setAppMessage(getErrorMessage(data.message));
        setAppSeverity('warning');
        setAppSnackOpen(true);
      }
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setAppMessage(err.message);
      setAppSeverity('error');
      setAppSnackOpen(true);
    }
  };

  useEffect(() => {
    const openSchedule = async () => {
      setIsAppLoad(false);
      let weekDate = await getCurrentWeekDate();
      weekDate = weekDate.replaceAll('/', '-');
      navigate(`/meeting-schedule/${weekDate}`);
    };

    if (!isFetchingSchedule) {
      setTimeout(() => {
        openSchedule();
      }, [2000]);
    }
  }, [isFetchingSchedule, navigate, setIsAppLoad]);

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('welcome')}
      </Typography>

      <Typography sx={{ marginBottom: '20px' }}>{t('accountSetup')}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '290px' }}>
        <TextField
          sx={{
            width: '100%',
            '.MuiInputBase-input': {
              fontSize: '20px',
              textAlign: 'center',
              textTransform: 'uppercase',
            },
          }}
          id="outlined-signup-code"
          label={t('activationCode')}
          variant="outlined"
          autoComplete="off"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '500px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          disabled={!isOnline || isProcessing || visitorID.length === 0}
          onClick={handleSignUp}
          endIcon={visitorID.length === 0 || isProcessing ? <CircularProgress size={25} /> : null}
        >
          {t('activate')}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
