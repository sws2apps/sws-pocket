import { useRecoilValue } from 'recoil';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { themeOptionsState } from '../../states/theme';

const PersonFieldContainer = ({ person }) => {
  const theme = useTheme();

  const themeOptions = useRecoilValue(themeOptionsState);

  return (
    <Box sx={{ display: 'flex', marginRight: '5px', alignItems: 'flex-end' }}>
      <Typography
        sx={{
          height: '25px',
          lineHeight: '25px',
          width: '165px',
          padding: '2px 2px 2px 5px',
          borderRadius: 5,
          fontWeight: 'bold',
          backgroundColor: alpha(theme.palette.common[themeOptions.searchBg], 0.15),
        }}
        variant="body1"
      >
        {person}
      </Typography>
    </Box>
  );
};

export default PersonFieldContainer;
