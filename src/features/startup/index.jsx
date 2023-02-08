import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import SignUp from './SignUp';
import UnauthorizedRole from './UnauthorizedRole';
import { getCurrentWeekDate, loadApp } from '../../utils/app';
import {
  isAppLoadState,
  isFetchingScheduleState,
  isOnlineState,
  isSetupState,
  isUnauthorizedRoleState,
  isUserSignUpState,
  rootModalOpenState,
  visitorIDState,
} from '../../states/main';
import { apiPocketValidate } from '../../utils/api';
import { dbUpdateUserSettings } from '../../indexedDb/dbAppSettings';
import { congAccountConnectedState } from '../../states/congregation';
import { deleteDb, isDbExist } from '../../indexedDb/dbUtility';

const Startup = () => {
  const navigate = useNavigate();

  const [isSetup, setIsSetup] = useRecoilState(isSetupState);
  const [isUserSignUp, setIsUserSignUp] = useRecoilState(isUserSignUpState);

  const setIsAppLoad = useSetRecoilState(isAppLoadState);
  const setIsUnauthorizedRole = useSetRecoilState(isUnauthorizedRoleState);
  const setCongAccountConnected = useSetRecoilState(congAccountConnectedState);
  const setModalOpen = useSetRecoilState(rootModalOpenState);

  const isUnauthorizedRole = useRecoilValue(isUnauthorizedRoleState);
  const isOnline = useRecoilValue(isOnlineState);
  const visitorID = useRecoilValue(visitorIDState);
  const isFetchingSchedule = useRecoilValue(isFetchingScheduleState);

  const handleDisapproved = useCallback(async () => {
    setModalOpen(true);
    await deleteDb();
    setModalOpen(false);
    window.location.href = './';
  }, [setModalOpen]);

  useEffect(() => {
    const checkLoginState = async () => {
      if (isOnline && visitorID.length > 0) {
        const { data, status } = await apiPocketValidate();

        if (status === 200) {
          const { cong_role } = data;
          if (cong_role.includes('view_meeting_schedule')) {
            await loadApp();
            await dbUpdateUserSettings(data);
            setTimeout(async () => {
              setCongAccountConnected(true);
            }, [1000]);
          } else {
            setIsSetup(true);
            setIsUserSignUp(false);
            setIsUnauthorizedRole(true);
          }
        } else {
          const isExist = await isDbExist('sws_pocket');
          if (isExist) {
            await handleDisapproved();
            return;
          }

          setIsSetup(true);
          setIsUserSignUp(true);
        }
      }

      if (!isOnline) {
        const isExist = await isDbExist('sws_pocket');
        if (isExist) {
          await loadApp();
          setIsAppLoad(false);
          navigate('/meeting-schedule');
        }
      }
    };

    checkLoginState();
  }, [
    handleDisapproved,
    isOnline,
    navigate,
    setCongAccountConnected,
    setIsAppLoad,
    setIsSetup,
    setIsUserSignUp,
    setIsUnauthorizedRole,
    visitorID,
  ]);

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
    <>
      {isSetup && (
        <>
          {isUserSignUp && <SignUp />}
          {isUnauthorizedRole && <UnauthorizedRole />}
          {}
        </>
      )}
      {!isSetup && (
        <Box className="app-splash-screen">
          <Box className="app-logo-container">
            <img src="/img/appLogo.png" alt="App logo" className="appLogo" />
          </Box>
          <Box sx={{ width: '280px', marginTop: '10px' }}>
            <LinearProgress />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Startup;
