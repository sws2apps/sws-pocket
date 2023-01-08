import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AssignmentTypeContainer from './AssignmentTypeContainer';
import PersonFieldContainer from './PersonFieldContainer';

const styles = {
  studentPartWrapper1: {
    width: {
      xs: '100%',
      sm: 'calc(100% - 300px)',
    },
  },
  studentPartWrapper2: {
    width: {
      xs: '100%',
      sm: 'calc(100% - 300px)',
      sm800: 'calc(100% - 600px)',
      lg: 'calc(100% - 300px)',
    },
    flexDirection: {
      sm800: 'row',
    },
  },
  studentContainer1: {
    display: 'flex',
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-end',
    },
  },
  studentContainer2: {
    display: 'flex',
    gap: '5px',
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-end',
    },
    flexDirection: {
      xs: 'column',
      xs420: 'row',
      sm: 'column',
      sm800: 'row',
      lg: 'column',
    },
  },
  studentContainer1Styles: {
    display: 'flex',
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-end',
    },
  },
  studentContainer2Styles: {
    display: 'flex',
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-end',
    },
    flexDirection: {
      xs: 'column',
      xs420: 'row',
      sm: 'column',
      sm800: 'row',
      lg: 'column',
    },
  },
};

const ScheduleRowContainer = ({ class_count = 1, source, sourceAlt, personA, personB, cbs }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}
    >
      <Grid item sx={class_count === 1 ? styles.studentPartWrapper1 : styles.studentPartWrapper2}>
        <AssignmentTypeContainer type={source} />
        {sourceAlt && <Typography variant="body1">{sourceAlt}</Typography>}
      </Grid>

      <Grid
        item
        sx={cbs ? styles.studentContainer2 : class_count === 1 ? styles.studentContainer1 : styles.studentContainer2}
      >
        <PersonFieldContainer person={personA} />
        {(class_count === 2 || cbs) && <PersonFieldContainer person={personB} />}
      </Grid>
    </Box>
  );
};

export default ScheduleRowContainer;
