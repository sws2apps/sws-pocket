import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import UserSessions from './UserSessions';

const subtitles = {
  marginTop: '20px',
  fontWeight: 'bold',
  lineHeight: 1.2,
  paddingBottom: '5px',
};

const MyAccount = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography className={'settingHeader'}>{t('myAccount')}</Typography>
      <Divider sx={{ borderWidth: '5px' }} />
      <Typography sx={subtitles}>{t('sessions')}</Typography>
      <Divider />
      <UserSessions />
    </Box>
  );
};

export default MyAccount;
