import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { appVersionState) from '../../appStates/appSettings';

const About = (props) => {
    const { isAboutOpen } = props;
    const [isOpen, setIsOpen] = useState(false);
    
    const appVersion = useRecoilValue(appVersionState);

    const handleClose = () => {
        props.openAbout(false);
    }

    useEffect(() => {
        setIsOpen(isAboutOpen);
    }, [isAboutOpen])

    return ( 
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{maxWidth: '500px', margin: 'auto'}}
        >
            <DialogContent sx={{padding: '10px'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="/img/appLogo.png" alt="App logo" className="appLogoMini" />
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            marginTop: '5px',
                        }}
                    >
                        SWS Pocket
                    </Typography>
                    <Typography variant="body1">{appVersion}</Typography>
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        Programa fijerena anjara amin’ny fivoriana andavanandro sy faran’ny herinandro ny SWS Pocket. Raha mila fanampiana amin’ny fampiasana ity programa ity ianao dia miresaha amin’ny anti-panahy ao amin’ny fiangonana misy anao.
                    </Typography>
                    <Typography variant="body2">Copyright © 2021 | SWS Pocket [SWS]</Typography>
                </Box>
            </DialogContent>
        </Dialog>
     );
}
 
export default About;
