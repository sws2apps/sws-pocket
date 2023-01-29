import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ScheduleMeetingPart from './ScheduleMeetingPart';
import ScheduleRowAssignment from './ScheduleRowAssignment';
import SingleAssignment from './SingleAssignment';
import { classCountState } from '../../states/congregation';
import { scheduleLocalState } from '../../states/schedule';
import { sourceLangState } from '../../states/main';

const ScheduleAssignment = ({ edit }) => {
  const { weekToFormat } = useParams();

  const { t } = useTranslation();

  const classCount = useRecoilValue(classCountState);
  const schedules = useRecoilValue(scheduleLocalState);
  const sourceLang = useRecoilValue(sourceLangState);

  const [tgwTalkSrc, setTgwTalkSrc] = useState('');
  const [bibleReadingSrc, setBibleReadingSrc] = useState('');
  const [bibleReadingStudy, setBibleReadingStudy] = useState('');
  const [ass1Type, setAss1Type] = useState('');
  const [ass1TypeName, setAss1TypeName] = useState('');
  const [ass1Time, setAss1Time] = useState('');
  const [ass1Study, setAss1Study] = useState('');
  const [ass1Src, setAss1Src] = useState('');
  const [ass2Type, setAss2Type] = useState('');
  const [ass2TypeName, setAss2TypeName] = useState('');
  const [ass2Time, setAss2Time] = useState('');
  const [ass2Study, setAss2Study] = useState('');
  const [ass2Src, setAss2Src] = useState('');
  const [ass3Type, setAss3Type] = useState('');
  const [ass3TypeName, setAss3TypeName] = useState('');
  const [ass3Time, setAss3Time] = useState('');
  const [ass3Study, setAss3Study] = useState('');
  const [ass3Src, setAss3Src] = useState('');
  const [ass4Type, setAss4Type] = useState('');
  const [ass4TypeName, setAss4TypeName] = useState('');
  const [ass4Time, setAss4Time] = useState('');
  const [ass4Study, setAss4Study] = useState('');
  const [ass4Src, setAss4Src] = useState('');
  const [lcCount, setLcCount] = useState(1);
  const [lcPart1Time, setLcPart1Time] = useState('');
  const [lcPart1Src, setLcPart1Src] = useState('');
  const [lcPart1Content, setLcPart1Content] = useState('');
  const [lcPart2Time, setLcPart2Time] = useState('');
  const [lcPart2Src, setLcPart2Src] = useState('');
  const [lcPart2Content, setLcPart2Content] = useState('');
  const [cbsSrc, setCbsSrc] = useState('');
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

  const week = weekToFormat.replaceAll('-', '/');

  useEffect(() => {
    const loadCurrentWeekData = async () => {
      const lang = sourceLang.toUpperCase();

      const schedule = schedules.find((data) => data.weekOf === week);

      setChairmanA(schedule.chairmanMM_A_dispName);
      setChairmanB(schedule.chairmanMM_B_dispName);
      setOpeningPrayer(schedule.opening_prayer_dispName);
      setTgwTalkSrc(schedule.tgwTalk_src ? schedule.tgwTalk_src[lang] : '');
      setTgwTalk(schedule.tgw_talk_dispName);
      setTgwGems(schedule.tgw_gems_dispName);
      setBibleReadingSrc(schedule.bibleReading_src ? schedule.bibleReading_src[lang] : '');
      setBibleReadingStudy(schedule.bibleReading_study);
      setStuBReadA(schedule.bRead_stu_A_dispName);
      setStuBReadB(schedule.bRead_stu_B_dispName);
      setAss1Type(schedule.ass1_type);
      setAss1TypeName(schedule.ass1_type_name ? schedule.ass1_type_name[lang] : '');
      setAss1Src(schedule.ass1_src ? schedule.ass1_src[lang] : '');
      setAss1Time(schedule.ass1_time);
      setAss1Study(schedule.ass1_study);
      setStu1A(schedule.ass1_stu_A_dispName);
      setAss1A(schedule.ass1_ass_A_dispName);
      setStu1B(schedule.ass1_stu_B_dispName);
      setAss1B(schedule.ass1_ass_B_dispName);
      setAss2Type(schedule.ass2_type);
      setAss2TypeName(schedule.ass2_type_name ? schedule.ass2_type_name[lang] : '');
      setAss2Src(schedule.ass2_src ? schedule.ass2_src[lang] : '');
      setAss2Time(schedule.ass2_time);
      setAss2Study(schedule.ass2_study);
      setStu2A(schedule.ass2_stu_A_dispName);
      setAss2A(schedule.ass2_ass_A_dispName);
      setStu2B(schedule.ass2_stu_B_dispName);
      setAss2B(schedule.ass2_ass_B_dispName);
      setAss3Type(schedule.ass3_type);
      setAss3TypeName(schedule.ass3_type_name ? schedule.ass3_type_name[lang] : '');
      setAss3Src(schedule.ass3_src ? schedule.ass3_src[lang] : '');
      setAss3Time(schedule.ass3_time);
      setAss3Study(schedule.ass3_study);
      setStu3A(schedule.ass3_stu_A_dispName);
      setAss3A(schedule.ass3_ass_A_dispName);
      setStu3B(schedule.ass3_stu_B_dispName);
      setAss3B(schedule.ass3_ass_B_dispName);
      setAss4Type(schedule.ass4_type);
      setAss4TypeName(schedule.ass4_type_name ? schedule.ass4_type_name[lang] : '');
      setAss4Src(schedule.ass4_src ? schedule.ass4_src[lang] : '');
      setAss4Time(schedule.ass4_time);
      setAss4Study(schedule.ass4_study);
      setStu4A(schedule.ass4_stu_A_dispName);
      setAss4A(schedule.ass4_ass_A_dispName);
      setStu4B(schedule.ass4_stu_B_dispName);
      setAss4B(schedule.ass4_ass_B_dispName);
      if (schedule.lcCount_override) {
        setLcCount(schedule.lcCount_override);
        setLcPart1Time(schedule.lcPart1_time_override);
        setLcPart1Src(schedule.lcPart1_src_override ? schedule.lcPart1_src_override[lang] : '');
        setLcPart1Content(schedule.lcPart1_content_override ? schedule.lcPart1_content_override[lang] : '');
        setLcPart2Time(schedule.lcPart2_time_override);
        setLcPart2Src(schedule.lcPart2_src_override ? schedule.lcPart2_src_override[lang] : '');
        setLcPart2Content(schedule.lcPart2_content_override ? schedule.lcPart2_content_override[lang] : '');
      } else {
        setLcCount(schedule.lcCount);
        setLcPart1Time(schedule.lcPart1_time);
        setLcPart1Src(schedule.lcPart1_src ? schedule.lcPart1_src[lang] : '');
        setLcPart1Content(schedule.lcPart1_content ? schedule.lcPart1_content[lang] : '');
        setLcPart2Time(schedule.lcPart2_time);
        setLcPart2Src(schedule.lcPart2_src ? schedule.lcPart2_src[lang] : '');
        setLcPart2Content(schedule.lcPart2_content ? schedule.lcPart2_content[lang] : '');
      }
      setLcPart1(schedule.lc_part1_dispName);
      setLcPart2(schedule.lc_part2_dispName);
      setCbsSrc(schedule.cbs_src ? schedule.cbs_src[lang] : '');
      setCbsConductor(schedule.cbs_conductor_dispName);
      setCbsReader(schedule.cbs_reader_dispName);
      setClosingPrayer(schedule.closing_prayer_dispName);
      setWeekType(schedule.week_type);
    };

    if (week !== '') {
      loadCurrentWeekData();
    }
  }, [t, week, schedules, sourceLang]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        {/* Intro Parts */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Chairman */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Chairman A */}
            <SingleAssignment header={t('chairmanMidweekMeeting')} person={chairmanA} />
            {/* Chairman B */}
            {classCount === 2 && weekType === 1 && (
              <SingleAssignment header={t('auxClassCounselor')} person={chairmanB} />
            )}
          </Box>

          {/* Opening Prayer */}
          <SingleAssignment header={t('prayerMidweekMeeting')} person={openingPrayer} />
        </Box>

        {/* TGW */}
        <ScheduleMeetingPart type="tgwPart" part={t('treasuresPart')} />

        {/* TGW Talk */}
        <ScheduleRowAssignment personA={tgwTalk} source={tgwTalkSrc} />

        {/* TGW Gems */}
        <ScheduleRowAssignment personA={tgwGems} source={t('tgwGems')} />

        {/* Bible Reading */}
        <ScheduleRowAssignment
          personA={stuBReadA}
          personB={stuBReadB}
          source={t('bibleReadingText')}
          student={true}
          studentPart={`${bibleReadingSrc}${
            bibleReadingStudy && bibleReadingStudy !== '' ? ` [${bibleReadingStudy}]` : ''
          }`}
        />

        {/* AYF */}
        <ScheduleMeetingPart type="ayfPart" part={t('applyFieldMinistryPart')} />

        {/* AYF 1 */}
        <ScheduleRowAssignment
          ayf={true}
          assType={ass1Type}
          assTypeName={ass1TypeName}
          assTime={ass1Time}
          personA={stu1A}
          assistantA={ass1A}
          personB={stu1B}
          assistantB={ass1B}
          source={ass1Src}
          student={true}
          studentPart={`${ass1Src}${ass1Study && ass1Study !== '' ? ` [${ass1Study}]` : ''}`}
        />

        {/* AYF 2 */}
        {ass2Type !== '' && !isNaN(ass2Type) && (
          <ScheduleRowAssignment
            ayf={true}
            assType={ass2Type}
            assTypeName={ass2TypeName}
            assTime={ass2Time}
            personA={stu2A}
            assistantA={ass2A}
            personB={stu2B}
            assistantB={ass2B}
            source={ass2Src}
            student={true}
            studentPart={`${ass2Src}${ass2Study && ass2Study !== '' ? ` [${ass2Study}]` : ''}`}
          />
        )}

        {/* AYF 3 */}
        {ass3Type !== '' && !isNaN(ass3Type) && (
          <ScheduleRowAssignment
            ayf={true}
            assType={ass3Type}
            assTypeName={ass3TypeName}
            assTime={ass3Time}
            personA={stu3A}
            assistantA={ass3A}
            personB={stu3B}
            assistantB={ass3B}
            source={ass3Src}
            student={true}
            studentPart={`${ass3Src}${ass3Study && ass3Study !== '' ? ` [${ass3Study}]` : ''}`}
          />
        )}

        {/* AYF 4 */}
        {ass4Type !== '' && !isNaN(ass4Type) && (
          <ScheduleRowAssignment
            ayf={true}
            assType={ass4Type}
            assTypeName={ass4TypeName}
            assTime={ass4Time}
            personA={stu4A}
            assistantA={ass4A}
            personB={stu4B}
            assistantB={ass4B}
            source={ass4Src}
            student={true}
            studentPart={`${ass4Src}${ass4Study && ass4Study !== '' ? ` [${ass4Study}]` : ''}`}
          />
        )}

        {/* LC */}
        <ScheduleMeetingPart type="lcPart" part={t('livingPart')} />

        {/* LC1 */}
        <ScheduleRowAssignment
          personA={lcPart1}
          source={`(${lcPart1Time} min.) ${lcPart1Src}`}
          lcPart={lcPart1Content}
        />

        {/* LC2 */}
        {lcCount > 1 && (
          <ScheduleRowAssignment
            edit={edit}
            personA={lcPart2}
            source={`(${lcPart2Time} min.) ${lcPart2Src}`}
            lcPart={lcPart2Content}
          />
        )}

        {/* CBS */}
        {weekType === 1 && (
          <ScheduleRowAssignment
            cbs={true}
            personA={cbsConductor}
            personB={cbsReader}
            source={t('cbs')}
            lcPart={cbsSrc}
          />
        )}

        {/* Closing Prayer */}
        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, marginTop: '20px' }}>
          <SingleAssignment edit={edit} header={t('prayerMidweekMeeting')} person={closingPrayer} />
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleAssignment;
