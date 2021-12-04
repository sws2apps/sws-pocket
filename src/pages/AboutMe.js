import { useRecoilValue } from "recoil";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { appVersionState, settingsState } from "../appStates/appSettings";

const AboutMe = () => {
    const appSettings = useRecoilValue(settingsState);
    const appVersion = useRecoilValue(appVersionState);

    const congID = appSettings.cong_id;
    const congPIN = appSettings.cong_PIN;
    const studentPIN = appSettings.student_PIN;
    const studentName = appSettings.student_name;
    let viewList = [...appSettings.viewStudent_Part];

    viewList.sort((a, b) => {
        return a.person_name > b.person_name ? 1 : -1;
    });

    return ( 
        <Box
            sx={{
                padding: '10px',
            }}
        >
            <Box
                sx={{
                    borderBottom: '1px solid black',
                    paddingBottom: '10px',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}
                >
                    Anarana
                </Typography>
                <Typography
                    sx={{
                        fontSize: '22px',
                        color: '#145A32',
                        lineHeight: 1.2,
                    }}
                >
                    {studentName}
                </Typography>
            </Box>
            {viewList.length > 0 && (
                <Box
                    sx={{
                        borderBottom: '1px solid black',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Anjaran’ny mpianatra hafa azonao jerena:
                    </Typography>
                    <List dense={true}>
                        {viewList.map(student => (
                            <ListItem key={student.id}>
                                <ListItemText
                                    primary={student.person_name}
                                    sx={{
                                        color: '#154360',
                                        margin: 0,
                                    }} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
            <Box
                sx={{
                    borderBottom: '1px solid black',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginBottom: '20px',
                    }}
                >
                    Kaody fidirana amin’ny SWS Pocket
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    <TextField
                        id="outlined-read-only-input"
                        label="Nomerao famantarana"
                        defaultValue={congID}
                        size='small'
                        sx={{
                            marginRight: '10px',
                            width: '200px',
                            marginBottom: '15px',
                            '& .MuiOutlinedInput-input': {
                                fontSize: '25px',
                            }
                        }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Kaody miafina"
                        defaultValue={congPIN}
                        size='small'
                        sx={{
                            marginRight: '10px',
                            marginBottom: '15px',
                            width: '160px',
                            '& .MuiOutlinedInput-input': {
                                fontSize: '25px',
                            }
                        }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <TextField
                    id="outlined-read-only-input"
                    label="Kaodinao manokana"
                    defaultValue={studentPIN}
                    size='small'
                    sx={{
                        marginRight: '10px',
                        width: '160px',
                        '& .MuiOutlinedInput-input': {
                            fontSize: '25px',
                        }
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
        </Box>
     );
}
 
export default AboutMe;