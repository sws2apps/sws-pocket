import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { formatScheduleState, startSyncState } from "../appStates/appSchedule";
import { settingsState } from "../appStates/appSettings";
import DlgSyncSchedule from "../components/home/DlgSyncSchedule";

const Home = () => {
    const scheduleData = useRecoilValue(formatScheduleState);
    const appSettings = useRecoilValue(settingsState);
    const idLMMOA = appSettings.id_lmm_oa;
    const viewList = appSettings.viewStudent_Part;

    const setStartSync = useSetRecoilState(startSyncState);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (navigator.onLine) {
            setStartSync(true);
        }
    }, [setStartSync])

    useEffect(() => {
        if (idLMMOA && scheduleData) {
            const data = [];
            for (let i=0; i < scheduleData.length; i++) {
                let obj = {};
                obj.month = scheduleData[i].month;
                obj.key = scheduleData[i].key;

                let weeks = scheduleData[i].weeks;
                
                let schedule = [];
                for (let a=0; a < weeks.length; a++) {
                    const weekItem = weeks[a];

                    const weekDate = weekItem.weekOf;
                    const day = weekDate.split("/")[1];
                    const month = weekDate.split("/")[0];
                    const year = weekDate.split("/")[2];
                    const weekDateFormatted = day + "/" + month + "/" + year;
                    
                    let item = {};

                    if (weekItem.bRead_stu_A === idLMMOA) {
                        item.key = "bRead-stuA-" + weekItem.weekOf;
                        item.assignment = "Famakiana Baiboly (Efitrano lehibe)";
                        item.src = weekItem.bibleReading_src;
                        item.isAlt = false;
                        item.altName = "";
                        item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                        item.style = 1;
                        schedule.push(item);
                        item = {};
                    }

                    let userIndex = viewList.findIndex(user => user.id === weekItem.bRead_stu_A);
                    if (userIndex >= 0) {
                        item.key = "bRead-stuA-alt-" + weekItem.weekOf;
                        item.assignment = "Famakiana Baiboly (Efitrano lehibe)";
                        item.src = weekItem.bibleReading_src;
                        item.isAlt = true;
                        item.altName = weekItem.bRead_stu_A_dispName;
                        item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                        item.style = 2;
                        schedule.push(item);
                        item = {};
                    }

                    if (weekItem.bRead_stu_B === idLMMOA) {
                        item.key = "bRead-stuB-" + weekItem.weekOf;
                        item.assignment = "Famakiana Baiboly (Efitrano faharoa)";
                        item.src = weekItem.bibleReading_src;
                        item.isAlt = false;
                        item.altName = "";
                        item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                        item.style = 1;
                        schedule.push(item);
                        item = {};
                    }

                    userIndex = viewList.findIndex(user => user.id === weekItem.bRead_stu_B);
                    if (userIndex >= 0) {
                        item.key = "bRead-stuB-alt-" + weekItem.weekOf;
                        item.assignment = "Famakiana Baiboly (Efitrano faharoa)";
                        item.src = weekItem.bibleReading_src;
                        item.isAlt = true;
                        item.altName = weekItem.bRead_stu_B_dispName;
                        item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                        item.style = 2;
                        schedule.push(item);
                        item = {};
                    }

                    for (let a=1; a <= 4; a++) {
                        let fldNameA = "ass" + a + "_stu_A";
                        let fldNameDispA = "ass" + a + "_stu_A_dispName";
                        let fldAssTypeA = "ass" + a + "_type_name";
                        let fldAssSrcA = "ass" + a + "_src";
                        let fldNameAssA = "ass" + a + "_ass_A";
                        let fldNameDispAssA = "ass" + a + "_ass_A_dispName";

                        let fldNameB = "ass" + a + "_stu_B";
                        let fldNameDispB = "ass" + a + "_stu_B_dispName";
                        let fldAssTypeB = "ass" + a + "_type_name";
                        let fldAssSrcB = "ass" + a + "_src";
                        let fldNameAssB = "ass" + a + "_ass_B";
                        let fldNameDispAssB = "ass" + a + "_ass_B_dispName";

                        if (weekItem[fldNameA] === idLMMOA) {
                            item.key = "ass" + a + "-stuA-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeA] + " (Efitrano lehibe)";
                            if (weekItem[fldNameAssA]) {
                                item.assistant = weekItem[fldNameDispAssA];
                            }
                            item.src = weekItem[fldAssSrcA];
                            item.isAlt = false;
                            item.altName = "";
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 1;
                            schedule.push(item);
                            item = {};
                        }

                        userIndex = viewList.findIndex(user => user.id === weekItem[fldNameA]);
                        if (userIndex >= 0) {
                            item.key = "ass" + a + "-stuA-alt-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeA] + " (Efitrano lehibe)";
                            if (weekItem[fldNameAssA]) {
                                item.assistant = weekItem[fldNameDispAssA];
                            }
                            item.src = weekItem[fldAssSrcA];
                            item.isAlt = true;
                            item.altName = weekItem[fldNameDispA];
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 2;
                            schedule.push(item);
                            item = {};
                        }

                        if (weekItem[fldNameAssA] === idLMMOA) {
                            item.key = "ass" + a + "-assA-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeA] + " - Mpanampy (Efitrano lehibe)";
                            item.mainStudent = weekItem[fldNameDispA];
                            item.src = weekItem[fldAssSrcA];
                            item.isAlt = false;
                            item.altName = "";
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 1;
                            schedule.push(item);
                            item = {};
                        }

                        userIndex = viewList.findIndex(user => user.id === weekItem[fldNameAssA]);
                        if (userIndex >= 0) {
                            item.key = "ass" + a + "-assA-alt-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeA] + " - Mpanampy (Efitrano lehibe)";
                            item.mainStudent = weekItem[fldNameDispA];
                            item.src = weekItem[fldAssSrcA];
                            item.isAlt = true;
                            item.altName = weekItem[fldNameDispAssA];
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 2;
                            schedule.push(item);
                            item = {};
                        }

                        if (weekItem[fldNameB] === idLMMOA) {
                            item.key = "ass" + a + "-stuB-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeB] + " (Efitrano faharoa)";
                            if (weekItem[fldNameAssB]) {
                                item.assistant = weekItem[fldNameAssB];
                            }
                            item.src = weekItem[fldAssSrcB];
                            item.isAlt = false;
                            item.altName = "";
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 1;
                            schedule.push(item);
                            item = {};
                        }

                        userIndex = viewList.findIndex(user => user.id === weekItem[fldNameB]);
                        if (userIndex >= 0) {
                            item.key = "ass" + a + "-stuB-alt-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeB] + " (Efitrano faharoa)";
                            if (weekItem[fldNameAssB]) {
                                item.assistant = weekItem[fldNameDispAssB];
                            }
                            item.src = weekItem[fldAssSrcB];
                            item.isAlt = true;
                            item.altName = weekItem[fldNameDispB];
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 2;
                            schedule.push(item);
                            item = {};
                        }

                        if (weekItem[fldNameAssB] === idLMMOA) {
                            item.key = "ass" + a + "-assB-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeB] + " - Mpanampy (Efitrano faharoa)";
                            item.mainStudent = weekItem[fldNameDispB];
                            item.src = weekItem[fldAssSrcB];
                            item.isAlt = false;
                            item.altName = "";
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 1;
                            schedule.push(item);
                            item = {};
                        }

                        userIndex = viewList.findIndex(user => user.id === weekItem[fldNameAssB]);
                        if (userIndex >= 0) {
                            item.key = "ass" + a + "-assB-alt-" + weekItem.weekOf;
                            item.assignment = weekItem[fldAssTypeB] + " - Mpanampy (Efitrano faharoa)";
                            item.mainStudent = weekItem[fldNameDispB];
                            item.src = weekItem[fldAssSrcB];
                            item.isAlt = true;
                            item.altName = weekItem[fldNameDispAssB];
                            item.desc = "Fivoriana Andavanandro - " + weekDateFormatted;
                            item.style = 2;
                            schedule.push(item);
                            item = {};
                        }
                    }
                }

                obj.assignments = schedule;

                if (schedule.length > 0) {
                    data.push(obj);
                }                
            }
            setUserData(data);
        }
    }, [idLMMOA, viewList, scheduleData])
    
    return (
        <>
            <DlgSyncSchedule />
            <Grid
                container
                sx={{
                    marginLeft: '5px',
                    width: '98%',
                }}
            >
                {userData.map(schedule => (
                    <Grid item key={schedule.key} xs={12} lg={6} sx={{padding: '10px'}}>
                        <Box
                            sx={{
                                borderBottom: '3px double black',
                                marginBottom: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                }}
                            >
                                {schedule.month}
                            </Typography>
                        </Box>
                        {schedule.assignments.map(assignment => (
                            <Box
                                key={assignment.key}
                                sx={{
                                    borderLeft: `${
                                        assignment.style === 1 ? '8px groove green' :
                                        assignment.style === 2 ? '8px groove blue' : ''
                                    }`,
                                    padding: '5px',
                                    marginBottom: '10px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {assignment.assignment}
                                </Typography>
                                {assignment.isAlt && (
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {assignment.altName}
                                        {assignment.mainStudent && (
                                            <Box component="span" sx={{fontWeight: 'normal'}}> [Mpianatra: {assignment.mainStudent}]</Box>
                                        )}
                                        {assignment.assistant && (
                                            <Box component="span" sx={{fontWeight: 'normal'}}> [Mpanampy: {assignment.assistant}]</Box>
                                        )}
                                    </Typography>
                                )}
                                {!assignment.isAlt && (
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {assignment.mainStudent ? `Mpitarika: ${assignment.mainStudent}` : ''}{assignment.assistant ? `Mpanampy: ${assignment.assistant}` : ''}
                                    </Typography>
                                )}
                                <Typography>
                                    {assignment.src}
                                </Typography>
                                <Typography>
                                    {assignment.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Home;