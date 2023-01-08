import { useRouteError } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ErrorBoundary = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <Box sx={{ display: 'flex', padding: '15px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <Box>
        <Typography>Ooops, an error occured in CPE:</Typography>
      </Box>
      <Box>
        <Typography>{error.data || error.message}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;
