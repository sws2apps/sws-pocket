import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { isRefreshScheduleOpenState } from '../../states/schedule';

const ScheduleDownloader = () => {
  const { t } = useTranslation('ui');

  const [open, setOpen] = useRecoilState(isRefreshScheduleOpenState);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-close-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress
              color="secondary"
              size={80}
              disableShrink={true}
              sx={{
                display: 'flex',
                margin: '10px auto',
              }}
            />
            <Typography>{t('waitScheduleRefresh')}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ScheduleDownloader;
