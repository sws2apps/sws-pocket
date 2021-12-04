import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { deleteDb, initAppDb } from '../indexedDb/dbUtility';
import { dbGetAppSettings, dbUpdateAppSettings } from '../indexedDb/dbAppSettings';
import { apiHostState, isAppLoadState, settingsState } from '../appStates/appSettings';
import { scheduleState } from '../appStates/appSchedule';
import { dbGetScheduleAll } from '../indexedDb/dbSchedule';
import { appMessageState, appSeverityState, appSnackOpenState } from '../appStates/appNotification';

const Startup = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [congID, setCongID] = useState(false);
    const [congPIN, setCongPIN] = useState(false);
    const [studentPIN, setStudentPIN] = useState(false);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const setSettings = useSetRecoilState(settingsState);
    const setSchedules = useSetRecoilState(scheduleState);
    const setIsAppLoad = useSetRecoilState(isAppLoadState);
    const setAppSnackOpen = useSetRecoilState(appSnackOpenState);
    const setAppSeverity = useSetRecoilState(appSeverityState);
    const setAppMessage = useSetRecoilState(appMessageState);

    const apiHost = useRecoilValue(apiHostState);

    const handleLoginPocket = useCallback(async (congID, congPIN, studentPIN) => {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}api/sws-pocket/login`, {
                method: 'GET',
                headers: {
                    'cong_id': congID.toString(),
                    'cong_pin': congPIN.toString(),
                    'user_pin': studentPIN.toString(), 
                }
            })
            .then(async (res) => {
                const data = await res.json();

                let obj = {};
                obj.status = res.status;                
                obj.message = data.message;

                resolve(obj);
            })
            .catch(() => {
                reject('Error')
            })
        });
    }, [apiHost])

    const handleLogin = async () => {
        setIsLoginLoading(true);
        const fetchResult = await handleLoginPocket(congID, congPIN, studentPIN);
        console.log(fetchResult);
        if (fetchResult === 'Error') {
            setAppSnackOpen(true);
            setAppSeverity("error");
            setAppMessage("Misy olana ka tsy mbola afaka miditra ianao izao");
            setIsLoginLoading(false);
        } else {
            const { status, message } = fetchResult;
            if (status === 200) {
                let obj = {};
                obj.cong_id = congID;
                obj.cong_PIN = congPIN;
                obj.class_count = message.classCount;
                obj.student_PIN = studentPIN;
                obj.student_name= message.studentName;
                obj.id_lmm_oa = message.lmmoaID;
                obj.viewStudent_Part = message.viewList;
                
                setSettings(obj);

                await dbUpdateAppSettings(obj);

                setIsLogin(false);
                setTimeout(() => {
                    setIsAppLoad(false);
                }, 1000);
            } else {
                setIsLoginLoading(false);
                setAppSnackOpen(true);
                setAppSeverity("warning");
                setAppMessage(message);
            }
        }
    }

    useEffect(() => {
        if (congID && congPIN && studentPIN) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }, [congID, congPIN, studentPIN])

    useEffect(() => {
        const startApp = async () => {
            await initAppDb();
            let {cong_id, cong_PIN, student_PIN, class_count, id_lmm_oa, student_name, viewStudent_Part} = await dbGetAppSettings();
            let loginVerified = false;

            if (cong_id && cong_PIN && student_PIN) {
                if (navigator.onLine) {
                    const fetchResult = await handleLoginPocket(cong_id, cong_PIN, student_PIN);
                    const { message } = fetchResult || '';
                    let isValid = 'invalid';

                    if (fetchResult === 'Error') {
                        isValid = 'ok';
                    } else {
                        const { status } = fetchResult;
                        if (status === 401 || status === 404) {
                            isValid = 'invalid';
                        } else if (status === 200) {
                            isValid = 'ok';
                        }
                    }

                    if (isValid === 'invalid') {
                        await deleteDb();
                        setIsLogin(true);
                        return;
                    } else if (isValid === 'ok') {
                        id_lmm_oa = message.lmmoaID;
                        student_name = message.studentName;
                        viewStudent_Part = message.viewList;
                        class_count = message.classCount;
                        loginVerified = true;
                    }
                } else {
                    loginVerified = true;
                }
            } else {
                setIsLogin(true);
                return;
            }

            if (loginVerified) {
                let obj = {};
                obj.id_lmm_oa = id_lmm_oa;
                obj.student_name = student_name;
                obj.viewStudent_Part = viewStudent_Part;
                await dbUpdateAppSettings(obj);

                obj.cong_id = cong_id;
                obj.cong_PIN = cong_PIN;
                obj.class_count = class_count;
                obj.student_PIN = student_PIN;
                obj.student_name = student_name;
                obj.id_lmm_oa = id_lmm_oa;
                obj.viewStudent_Part = viewStudent_Part;
                setSettings(obj);

                const sched = await dbGetScheduleAll();
                setSchedules(sched);

                setIsLogin(false);
                setTimeout(() => {
                    setIsAppLoad(false);
                }, 1000);
            } else {
                setAppSnackOpen(true);
                setAppSeverity("warning");
                setAppMessage("Havaozy ny fanazavana hidirana amin’ny SWS Pocket");
            }
        }

        startApp();
    }, [handleLoginPocket, setAppMessage, setAppSeverity, setAppSnackOpen, setIsAppLoad, setSchedules, setSettings])

    if (isLogin) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '80vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid black',
                        padding: '10px',
                        height: 'auto',
                        margin: 'auto',
                        borderRadius: '10px',
                        boxShadow: '1px 2px #888888',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: '100px',
                            marginBottom: '10px',
                        }}
                    >
                        <img src="/img/appLogo.png" alt="App logo" className="appLogoMini" />
                        <Typography sx={{fontWeight: 'bold', fontSize: '16px'}}>SWS Pocket</Typography>
                        <Typography variant="body1">{process.env.REACT_APP_VERSION}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Nomerao famantarana"
                            variant="outlined"
                            size="small"
                            type="number"
                            autoComplete="off"
                            sx={{marginBottom: '15px'}}
                            value={congID}
                            onChange={(e) => setCongID(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Kaody miafina"
                            variant="outlined"
                            size="small"
                            type="number"
                            autoComplete="off"
                            sx={{marginBottom: '15px'}}
                            value={congPIN}
                            onChange={(e) => setCongPIN(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Kaodinao manokana"
                            variant="outlined"
                            size="small"
                            type="number"
                            autoComplete="off"
                            sx={{marginBottom: '15px'}}
                            value={studentPIN}
                            onChange={(e) => setStudentPIN(e.target.value)}
                        />
                        {!isLoginLoading && (
                            <Button
                                variant="text"
                                disabled={loginDisabled}
                                onClick={handleLogin}
                            >
                                Hiditra
                            </Button>
                        )}
                        {isLoginLoading && (
                            <CircularProgress disableShrink={true} size={37} />
                        )}
                    </Box>
                </Box>
            </Box>
        )
    }

    return ( 
        <div className="app-splash-screen">
            <div className="app-logo-container">
                <img src="/img/appLogo.png" alt="App logo" className="appLogo" />
            </div>
            <CircularProgress disableShrink={true}  />
        </div>
     );
}
 
export default Startup;