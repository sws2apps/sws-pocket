import Box from '@mui/material/Box';
import SingleAssignmentHeader from './SingleAssignmentHeader';
import SingleAssignmentPerson from './SingleAssignmentPerson';

const styles = {
  personContainer: { display: 'flex', marginRight: '5px', alignItems: 'flex-end' },
};
const SingleAssignment = ({ ayf, header, person, assistant, assType, assTypeName }) => {
  const getPersonStyle = () => {
    if (ayf)
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        marginBottom: '10px',
      };
    return {};
  };

  return (
    <Box>
      {header && <SingleAssignmentHeader assignmentHeader={header} />}
      <Box sx={getPersonStyle()}>
        <Box sx={styles.personContainer}>
          <SingleAssignmentPerson person={person} />
        </Box>
        {ayf && assType !== 104 && (
          <Box sx={styles.personContainer}>
            <SingleAssignmentPerson person={assistant} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleAssignment;
