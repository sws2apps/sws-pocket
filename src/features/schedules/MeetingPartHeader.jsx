import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MeetingPartHeader = ({ className, text }) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        minWidth: '320px',
        borderRadius: '10px',
        padding: '0 10px',
        color: 'white',
        margin: '20px 0',
      }}
      className={className}
    >
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
};

export default MeetingPartHeader;
