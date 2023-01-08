import Typography from '@mui/material/Typography';

const AssignmentTypeContainer = ({ type, marginBottom }) => {
  return (
    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 16, marginBottom: marginBottom ? '5px' : null }}>
      {type}
    </Typography>
  );
};

export default AssignmentTypeContainer;
