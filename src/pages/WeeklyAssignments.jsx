import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import dateFormat from 'dateformat';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Typography from '@mui/material/Typography';
import { ScheduleAssignment } from '../features/schedules';
import { isMyAssignmentOpenState, shortDateFormatState } from '../states/main';
import { getCurrentWeekDate } from '../utils/app';
import { scheduleLocalState } from '../states/schedule';

const WeeklyAssignments = () => {
  const { t } = useTranslation('ui');

  const navigate = useNavigate();
  const { weekToFormat } = useParams();

  const setMyAssignmentsOpen = useSetRecoilState(isMyAssignmentOpenState);

  const schedules = useRecoilValue(scheduleLocalState);
  const shortDateFormat = useRecoilValue(shortDateFormatState);

  const [noMeeting, setNoMeeting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fCurrentWeek, setFCurrentWeek] = useState('');
  const [previousWeek, setPreviousWeek] = useState('');
  const [nextWeek, setNextWeek] = useState('');
  const [disablePrevious, setDisablePrevious] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [noSchedule, setNoSchedule] = useState(true);

  const handleOpenMyAssignment = () => {
    setMyAssignmentsOpen(true);
  };

  const handleActiveWeek = async () => {
    let weekDate = await getCurrentWeekDate();
    weekDate = weekDate.replaceAll('/', '-');
    navigate(`/meeting-schedule/${weekDate}`);
  };

  const handlePreviousWeek = () => {
    const weekDate = dateFormat(previousWeek, 'mm-dd-yyyy');
    navigate(`/meeting-schedule/${weekDate}`);
  };

  const handleNextWeek = () => {
    const weekDate = dateFormat(nextWeek, 'mm-dd-yyyy');
    navigate(`/meeting-schedule/${weekDate}`);
  };

  useEffect(() => {
    const loadCurrentWeekData = async () => {
      if (schedules.length > 0) {
        const week = weekToFormat.replaceAll('-', '/');
        const currentWeek = new Date(week);

        let result = new Date(currentWeek);
        result.setDate(result.getDate() - 7);
        let previousWeek = dateFormat(result, 'mm/dd/yyyy');

        let hasPrevious = schedules.find((data) => data.weekOf === previousWeek) ? true : false;

        if (!hasPrevious) {
          result.setDate(result.getDate() - 7);
          previousWeek = dateFormat(result, 'mm/dd/yyyy');
          hasPrevious = schedules.find((data) => data.weekOf === previousWeek) ? true : false;
        }
        setDisablePrevious(!hasPrevious);
        setPreviousWeek(result);

        result = new Date(currentWeek);
        result.setDate(result.getDate() + 7);
        let nextWeek = dateFormat(result, 'mm/dd/yyyy');

        let hasNext = schedules.find((data) => data.weekOf === nextWeek) ? true : false;
        if (!hasNext) {
          result.setDate(result.getDate() + 7);
          nextWeek = dateFormat(result, 'mm/dd/yyyy');
          hasNext = schedules.find((data) => data.weekOf === nextWeek) ? true : false;
        }
        setDisableNext(!hasNext);
        setNextWeek(result);

        const weekValue = dateFormat(currentWeek, 'mm/dd/yyyy');
        const weekValueFormatted = dateFormat(currentWeek, shortDateFormat);
        setFCurrentWeek(weekValueFormatted);

        const scheduleData = schedules.find((data) => data.weekOf === weekValue);
        if (scheduleData) {
          setNoMeeting(scheduleData.noMeeting);
          setNoSchedule(false);
        }

        if (!scheduleData) setNoSchedule(true);
      }

      setIsLoading(false);
    };
    setIsLoading(true);

    loadCurrentWeekData();
  }, [shortDateFormat, weekToFormat, schedules]);

  return (
    <Box
      sx={{
        paddingRight: '5px',
        width: {
          xs: '100%',
          lg: 'calc(100% - 400px)',
        },
      }}
    >
      {schedules.length === 0 && (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}
        >
          <InfoIcon color="primary" sx={{ fontSize: '80px' }} />
          <Typography variant="body1" align="center">
            {t('noSchedules')}
          </Typography>
        </Container>
      )}
      {schedules.length > 0 && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handlePreviousWeek} disabled={disablePrevious}>
                <SkipPreviousIcon sx={{ fontSize: '40px' }} />
              </IconButton>
              <IconButton onClick={handleActiveWeek}>
                <HomeIcon sx={{ fontSize: '40px' }} />
              </IconButton>
              <IconButton onClick={handleNextWeek} disabled={disableNext}>
                <SkipNextIcon sx={{ fontSize: '40px' }} />
              </IconButton>
              <Box sx={{ marginLeft: '8px' }}>
                <IconButton color="info" onClick={handleOpenMyAssignment}>
                  <OpenInNewIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="h6" align="center" sx={{ lineHeight: 1.3, marginBottom: '20px' }}>
              {t('currentSchedule', { currentWeek: fCurrentWeek })}
            </Typography>
          </Box>

          {isLoading && (
            <CircularProgress
              color="secondary"
              size={80}
              disableShrink={true}
              sx={{
                display: 'flex',
                margin: '20vh auto',
              }}
            />
          )}
          {!isLoading && (
            <>
              {noMeeting && (
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                  }}
                >
                  <NoMeetingRoomIcon color="error" sx={{ fontSize: '150px' }} />
                  <Typography variant="body1" align="center">
                    {t('noMeeting')}
                  </Typography>
                </Container>
              )}
              {noSchedule && (
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                  }}
                >
                  <NoMeetingRoomIcon color="error" sx={{ fontSize: '150px' }} />
                  <Typography variant="body1" align="center">
                    {t('noSchedule')}
                  </Typography>
                </Container>
              )}
              {!noSchedule && !noMeeting && <ScheduleAssignment />}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default WeeklyAssignments;
