import { useRecoilState, } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { openSyncDlgState } from "../../appStates/appDialog";

const DlgSyncSchedule = () => {
    const [open, setOpen] = useRecoilState(openSyncDlgState);

    const handleClose = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        setOpen(false);
    };

    return ( 
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Miandrasa kely ...</DialogTitle>
                <DialogContent>
                    <CircularProgress
                        color="secondary"
                        size={80}
                        disableShrink={true}
                        sx={{
                            display: 'flex',
                            margin: '10px auto',
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
     );
}

 
export default DlgSyncSchedule;