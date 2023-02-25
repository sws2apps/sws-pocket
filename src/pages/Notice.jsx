import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Notice = () => {
  const { t } = useTranslation('ui');
  return (
    <Container>
      <Box
        sx={{
          maxWidth: '500px',
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <InfoIcon color="warning" sx={{ fontSize: '60px' }} />
        <Typography align="center">{t('pocketMovedDesc')}</Typography>
        <Link href="https://cpe-sws.web.app" target="_blank" rel="noopener">
          https://cpe-sws.web.app
        </Link>
      </Box>
    </Container>
  );
};

export default Notice;
