import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Typography from '@mui/material/Typography';
import {
  AssignmentTypeContainer,
  MeetingPartHeader,
  PersonFieldContainer,
  ScheduleRowAYFContainer,
  ScheduleRowContainer,
} from '../features/schedules';
import { classCountState } from '../states/congregation';
import { isMyAssignmentOpenState, shortDateFormatState, sourceLangState } from '../states/main';
import { scheduleLocalState } from '../states/schedule';

const WeeklyAssignments = () => {
  const { t } = useTranslation();

  const setMyAssignmentsOpen = useSetRecoilState(isMyAssignmentOpenState);

  const classCount = useRecoilValue(classCountState);
  const shortDateFormat = useRecoilValue(shortDateFormatState);
  const schedules = useRecoilValue(scheduleLocalState);
  const sourceLang = useRecoilValue(sourceLangState);

  const [tgwTalkSrc, setTgwTalkSrc] = useState('');
  const [bibleReadingSrc, setBibleReadingSrc] = useState('');
  const [ass1Type, setAss1Type] = useState('');
  const [ass1TypeName, setAss1TypeName] = useState('');
  const [ass1Time, setAss1Time] = useState('');
  const [ass1Src, setAss1Src] = useState('');
  const [ass2Type, setAss2Type] = useState('');
  const [ass2TypeName, setAss2TypeName] = useState('');
  const [ass2Time, setAss2Time] = useState('');
  const [ass2Src, setAss2Src] = useState('');
  const [ass3Type, setAss3Type] = useState('');
  const [ass3TypeName, setAss3TypeName] = useState('');
  const [ass3Time, setAss3Time] = useState('');
  const [ass3Src, setAss3Src] = useState('');
  const [ass4Type, setAss4Type] = useState('');
  const [ass4TypeName, setAss4TypeName] = useState('');
  const [ass4Time, setAss4Time] = useState('');
  const [ass4Src, setAss4Src] = useState('');
  const [lcPart1Time, setLcPart1Time] = useState('');
  const [lcPart1Src, setLcPart1Src] = useState('');
  const [lcPart1Content, setLcPart1Content] = useState('');
  const [lcPart2Time, setLcPart2Time] = useState('');
  const [lcPart2Src, setLcPart2Src] = useState('');
  const [lcPart2Content, setLcPart2Content] = useState('');
  const [cbsSrc, setCbsSrc] = useState('');
  const [noMeeting, setNoMeeting] = useState(false);
  const [chairmanA, setChairmanA] = useState('');
  const [chairmanB, setChairmanB] = useState('');
  const [openingPrayer, setOpeningPrayer] = useState('');
  const [tgwTalk, setTgwTalk] = useState('');
  const [tgwGems, setTgwGems] = useState('');
  const [stuBReadA, setStuBReadA] = useState('');
  const [stuBReadB, setStuBReadB] = useState('');
  const [stu1A, setStu1A] = useState('');
  const [ass1A, setAss1A] = useState('');
  const [stu1B, setStu1B] = useState('');
  const [ass1B, setAss1B] = useState('');
  const [stu2A, setStu2A] = useState('');
  const [ass2A, setAss2A] = useState('');
  const [stu2B, setStu2B] = useState('');
  const [ass2B, setAss2B] = useState('');
  const [stu3A, setStu3A] = useState('');
  const [ass3A, setAss3A] = useState('');
  const [stu3B, setStu3B] = useState('');
  const [ass3B, setAss3B] = useState('');
  const [stu4A, setStu4A] = useState('');
  const [ass4A, setAss4A] = useState('');
  const [stu4B, setStu4B] = useState('');
  const [ass4B, setAss4B] = useState('');
  const [lcPart1, setLcPart1] = useState('');
  const [lcPart2, setLcPart2] = useState('');
  const [cbsConductor, setCbsConductor] = useState('');
  const [cbsReader, setCbsReader] = useState('');
  const [closingPrayer, setClosingPrayer] = useState('');
  const [weekType, setWeekType] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState('');
  const [fCurrentWeek, setFCurrentWeek] = useState('');
  const [previousWeek, setPreviousWeek] = useState('');
  const [nextWeek, setNextWeek] = useState('');
  const [disablePrevious, setDisablePrevious] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  const handleOpenMyAssignment = () => {
    setMyAssignmentsOpen(true);
  };

  const handleActiveWeek = () => {
    let isExist = false;

    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    let monDay = new Date(today.setDate(diff));

    do {
      const fDate = format(monDay, 'MM/dd/yyyy');
      const schedule = schedules.find((data) => data.weekOf === fDate);
      if (schedule) {
        setCurrentWeek(fDate);
        isExist = true;
      }

      monDay.setDate(monDay.getDate() + 7);
    } while (isExist === false);
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(previousWeek);
  };

  const handleNextWeek = () => {
    setCurrentWeek(nextWeek);
  };

  useEffect(() => {
    const loadCurrentWeekData = async () => {
      const lang = sourceLang.toUpperCase();

      setIsLoading(true);

      if (schedules) {
        const schedule = schedules.find((data) => data.weekOf === currentWeek);

        let result = new Date(currentWeek);
        result.setDate(result.getDate() - 7);
        let previousWeek = format(result, 'MM/dd/yyyy');
        let hasPrevious = schedules.find((data) => data.weekOf === previousWeek) ? true : false;
        if (!hasPrevious) {
          result.setDate(result.getDate() - 7);
          previousWeek = format(result, 'MM/dd/yyyy');
          hasPrevious = schedules.find((data) => data.weekOf === previousWeek) ? true : false;
        }
        setDisablePrevious(!hasPrevious);
        setPreviousWeek(previousWeek);

        result = new Date(currentWeek);
        result.setDate(result.getDate() + 7);
        let nextWeek = format(result, 'MM/dd/yyyy');
        let hasNext = schedules.find((data) => data.weekOf === nextWeek) ? true : false;
        if (!hasNext) {
          result.setDate(result.getDate() + 7);
          nextWeek = format(result, 'MM/dd/yyyy');
          hasNext = schedules.find((data) => data.weekOf === nextWeek) ? true : false;
        }
        setDisableNext(!hasNext);
        setNextWeek(nextWeek);

        if (schedule) {
          setWeekType(schedule.week_type);
          setFCurrentWeek(schedule.weekDate_src ? schedule.weekDate_src[lang] : '');
          setChairmanA(schedule.chairmanMM_A_dispName);
          setChairmanB(schedule.chairmanMM_B_dispName);
          setOpeningPrayer(schedule.opening_prayer_dispName);
          setTgwTalkSrc(schedule.tgwTalk_src ? schedule.tgwTalk_src[lang] : '');
          setTgwTalk(schedule.tgw_talk_dispName);
          setTgwGems(schedule.tgw_gems_dispName);
          setBibleReadingSrc(schedule.bibleReading_src ? schedule.bibleReading_src[lang] : '');
          setStuBReadA(schedule.bRead_stu_A_dispName);
          setStuBReadB(schedule.bRead_stu_B_dispName);
          setAss1Type(schedule.ass1_type);
          setAss1TypeName(schedule.ass1_type_name ? schedule.ass1_type_name[lang] : '');
          setAss1Src(schedule.ass1_src ? schedule.ass1_src[lang] : '');
          setAss1Time(schedule.ass1_time);
          setStu1A(schedule.ass1_stu_A_dispName);
          setAss1A(schedule.ass1_ass_A_dispName);
          setStu1B(schedule.ass1_stu_B_dispName);
          setAss1B(schedule.ass1_ass_B_dispName);
          setAss2Type(schedule.ass2_type);
          setAss2TypeName(schedule.ass2_type_name ? schedule.ass2_type_name[lang] : '');
          setAss2Src(schedule.ass2_src ? schedule.ass2_src[lang] : '');
          setAss2Time(schedule.ass2_time);
          setStu2A(schedule.ass2_stu_A_dispName);
          setAss2A(schedule.ass2_ass_A_dispName);
          setStu2B(schedule.ass2_stu_B_dispName);
          setAss2B(schedule.ass2_ass_B_dispName);
          setAss3Type(schedule.ass3_type);
          setAss3TypeName(schedule.ass3_type_name ? schedule.ass3_type_name[lang] : '');
          setAss3Src(schedule.ass3_src ? schedule.ass3_src[lang] : '');
          setAss3Time(schedule.ass3_time);
          setStu3A(schedule.ass3_stu_A_dispName);
          setAss3A(schedule.ass3_ass_A_dispName);
          setStu3B(schedule.ass3_stu_B_dispName);
          setAss3B(schedule.ass3_ass_B_dispName);
          setAss4Type(schedule.ass4_type);
          setAss4TypeName(schedule.ass4_type_name ? schedule.ass4_type_name[lang] : '');
          setAss4Src(schedule.ass4_src ? schedule.ass4_src[lang] : '');
          setAss4Time(schedule.ass4_time);
          setStu4A(schedule.ass4_stu_A_dispName);
          setAss4A(schedule.ass4_ass_A_dispName);
          setStu4B(schedule.ass4_stu_B_dispName);
          setAss4B(schedule.ass4_ass_B_dispName);
          setLcPart1Time(schedule.lcPart1_time);
          setLcPart1Src(schedule.lcPart1_src ? schedule.lcPart1_src[lang] : '');
          setLcPart1Content(schedule.lcPart1_content ? schedule.lcPart1_content[lang] : '');
          setLcPart1(schedule.lc_part1_dispName);
          setLcPart2Time(schedule.lcPart2_time);
          setLcPart2Src(schedule.lcPart2_src ? schedule.lcPart2_src[lang] : '');
          setLcPart2Content(schedule.lcPart2_content ? schedule.lcPart2_content[lang] : '');
          setLcPart2(schedule.lc_part2_dispName);
          setCbsSrc(schedule.cbs_src ? schedule.cbs_src[lang] : '');
          setCbsConductor(schedule.cbs_conductor_dispName);
          setCbsReader(schedule.cbs_reader_dispName);
          setClosingPrayer(schedule.closing_prayer_dispName);
        } else {
          setNoMeeting(true);
        }
      }

      setIsLoading(false);
    };

    if (currentWeek !== '') {
      loadCurrentWeekData();
    }
  }, [shortDateFormat, sourceLang, currentWeek, schedules, t]);

  useEffect(() => {
    let isExist = false;

    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    let monDay = new Date(today.setDate(diff));

    do {
      const fDate = format(monDay, 'MM/dd/yyyy');
      const schedule = schedules.find((data) => data.weekOf === fDate);
      if (schedule) {
        setCurrentWeek(fDate);
        isExist = true;
      }

      monDay.setDate(monDay.getDate() + 7);
    } while (isExist === false);
  }, [schedules]);

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
          {!noMeeting && (
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Box>
                    <AssignmentTypeContainer type={t('chairmanMidweekMeeting')} />
                    <PersonFieldContainer person={chairmanA} />
                  </Box>
                  {classCount === 2 && weekType === 1 && (
                    <Box>
                      <AssignmentTypeContainer type={t('auxClassCounselor')} />
                      <PersonFieldContainer person={chairmanB} />
                    </Box>
                  )}
                </Box>
                <Box>
                  <AssignmentTypeContainer type={t('prayerMidweekMeeting')} />
                  <PersonFieldContainer person={openingPrayer} />
                </Box>
              </Box>
              <MeetingPartHeader className="tgwPart" text={t('treasuresPart')} />
              <ScheduleRowContainer source={tgwTalkSrc} personA={tgwTalk} />
              <ScheduleRowContainer source={t('tgwGems')} personA={tgwGems} />
              <ScheduleRowContainer
                class_count={classCount}
                source={t('bibleReadingText')}
                sourceAlt={bibleReadingSrc}
                personA={stuBReadA}
                personB={stuBReadB}
              />
              <MeetingPartHeader className="ayfPart" text={t('applyFieldMinistryPart')} />
              <ScheduleRowAYFContainer
                class_count={classCount}
                source={`${ass1TypeName} (${ass1Time} min.)`}
                sourceAlt={ass1Src}
                personA={stu1A}
                personB={stu1B}
                assistantA={ass1A}
                assistantB={ass1B}
                assType={ass1Type}
              />
              {!isNaN(ass2Type) && ass2Type !== '' && (
                <ScheduleRowAYFContainer
                  class_count={classCount}
                  source={`${ass2TypeName} (${ass2Time} min.)`}
                  sourceAlt={ass2Src}
                  personA={stu2A}
                  personB={stu2B}
                  assistantA={ass2A}
                  assistantB={ass2B}
                  assType={ass2Type}
                />
              )}
              {!isNaN(ass3Type) && ass3Type !== '' && (
                <ScheduleRowAYFContainer
                  class_count={classCount}
                  source={`${ass3TypeName} (${ass3Time} min.)`}
                  sourceAlt={ass3Src}
                  personA={stu3A}
                  personB={stu3B}
                  assistantA={ass3A}
                  assistantB={ass3B}
                  assType={ass3Type}
                />
              )}
              {!isNaN(ass4Type) && ass4Type !== '' && (
                <ScheduleRowAYFContainer
                  class_count={classCount}
                  source={`${ass4TypeName} (${ass4Time} min.)`}
                  sourceAlt={ass4Src}
                  personA={stu4A}
                  personB={stu4B}
                  assistantA={ass4A}
                  assistantB={ass4B}
                  assType={ass4Type}
                />
              )}
              <MeetingPartHeader className="lcPart" text={t('livingPart')} />
              <ScheduleRowContainer
                source={`(${lcPart1Time} min.) ${lcPart1Src}`}
                sourceAlt={lcPart1Content}
                personA={lcPart1}
              />
              {lcPart2Time !== '' && lcPart2Time !== undefined && (
                <ScheduleRowContainer
                  source={`(${lcPart2Time} min.) ${lcPart2Src}`}
                  sourceAlt={lcPart2Content}
                  personA={lcPart2}
                />
              )}
              {weekType === 1 && (
                <ScheduleRowContainer
                  class_count={classCount}
                  source={t('cbs')}
                  sourceAlt={cbsSrc}
                  personA={cbsConductor}
                  personB={cbsReader}
                  cbs
                />
              )}
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, marginTop: '20px' }}>
                <Box>
                  <AssignmentTypeContainer type={t('prayerMidweekMeeting')} />
                  <PersonFieldContainer person={closingPrayer} />
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default WeeklyAssignments;
