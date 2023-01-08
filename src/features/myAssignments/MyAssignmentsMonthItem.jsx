import { useRecoilValue } from 'recoil';
import { blue, deepOrange, indigo } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { sourceLangState } from '../../states/main';
import { t } from 'i18next';

const MyAssignmentsMonthItem = ({ assignment }) => {
  const { weekOf, assignmentContent, assignmentName, assignmentSource, assignmentTime, studyPoint } = assignment;

  const sourceLang = useRecoilValue(sourceLangState);
  const lang = sourceLang.toUpperCase();

  const dateValue = weekOf.split('/')[1];

  const getSource = () => {
    let src = '';
    if (assignmentSource && assignmentSource[lang] !== undefined) {
      src = assignmentSource[lang];

      if (assignmentTime) {
        src = `(${assignmentTime} min.) ${src}`;
      }

      if (studyPoint) {
        src = `${src} [${studyPoint}]`;
      }
    }

    return src;
  };

  const getStuAYF = () => {
    if (assignment.assistantDispName) {
      return `${t('assistant')}: ${assignment.assistantDispName}`;
    }
    if (assignment.studentForAssistant) {
      return `${t('student')}: ${assignment.studentForAssistant}`;
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <Paper
        sx={{ backgroundColor: assignment.isBehalf ? deepOrange[900] : indigo[800], padding: '0 20px' }}
        elevation={3}
      >
        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '22px', color: 'white' }}>
          {dateValue}
        </Typography>
      </Paper>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', gap: '10px', justifyContent: 'space-between' }}
        >
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            {assignmentName}
          </Typography>
          {assignment.class && (
            <Avatar sx={{ bgcolor: blue[500], width: '25px', height: '25px', fontSize: '15px', fontWeight: 'bold' }}>
              {assignment.class}
            </Avatar>
          )}
        </Box>
        {assignment.isBehalf && (
          <Typography sx={{ lineHeight: 1.2 }}>{`${t('presentedBy')}${assignment.personDispName}`}</Typography>
        )}
        {assignment.assignmentType === 'ayf' && <Typography sx={{ lineHeight: 1.2 }}>{getStuAYF()}</Typography>}
        <Typography sx={{ lineHeight: 1.2 }}>{getSource()}</Typography>
        {assignmentContent && assignmentContent[lang] !== '' && (
          <Typography sx={{ lineHeight: 1.2, fontSize: '14px' }}>{assignmentContent[lang]}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyAssignmentsMonthItem;
