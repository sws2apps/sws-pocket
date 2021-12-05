import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import GetApp from '@mui/icons-material/GetApp';
import LogoutIcon from '@mui/icons-material/Logout';
import SyncIcon from '@mui/icons-material/Sync';
import AppDrawer from "./AppDrawer";
import * as serviceWorkerRegistration from '../../serviceWorkerRegistration';
import { deleteDb } from "../../indexedDb/dbUtility";
import { openSyncDlgState } from "../../appStates/appDialog";
import { scheduleState, startSyncState } from "../../appStates/appSchedule";
import { apiHostState, settingsState } from "../../appStates/appSettings";
import { dbGetScheduleInfo, dbUpdateSchedule } from "../../indexedDb/dbSchedule";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
const drawerWidth = 280;

const AppMenus = (props) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appBarTitle, setAppBarTitle] = useState("Fandraisana");
  const { enabledInstall, isLoading, installPwa } = props;

  const [schedules, setSchedules] = useRecoilState(scheduleState);
  const [startSync, setStartSync] = useRecoilState(startSyncState);
  
  const setOpenSyncDlg = useSetRecoilState(openSyncDlgState);

  const appSettings = useRecoilValue(settingsState);
  const apiHost = useRecoilValue(apiHostState);
  const congID = appSettings.cong_id;
  const congPIN = appSettings.cong_PIN;
  const studentPIN = appSettings.student_PIN;

  useEffect(() => {
    if (location.pathname === "/") {
      setAppBarTitle("Anjarako");
    } else if (location.pathname === "/MidweekMeeting") {
      setAppBarTitle("Fivoriana Andavanandro");
    } else if (location.pathname === "/AboutMe") {
      setAppBarTitle("Mombamomba Ahy");
    };
    serviceWorkerRegistration.update();
  }, [location.pathname])

  const handleInstallPwa = () => {
    installPwa();
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleAbout = () => {
    props.openAbout(true);
  }

  const handleLogout = async () => {
    await deleteDb();

    window.location.href = './';
  }

  const handleSyncSchedule = useCallback(async () => {
    if (navigator.onLine) {
      setOpenSyncDlg(true);

      const receivedSched = await fetch(`${apiHost}api/sws-pocket/schedules`, {
        method: 'GET',
        headers: {
            'cong_id': congID.toString(),
            'cong_pin': congPIN.toString(),
            'user_pin': studentPIN.toString(), 
        }
      })

      if (receivedSched.status === 200) {
        const msgData = await receivedSched.json();
        let data = msgData.message;

        let finalData = [];

        for(let i=0; i < data.length; i++) {
            let obj = {};

            obj.id = data[i].id;
            obj.title = data[i].title;
            obj.date_received = data[i].dateSent;
            obj.schedule_data = data[i].schedule_data;

            const schedInfo = await dbGetScheduleInfo(data[i].id);
            
            if (schedInfo) {
                if (schedInfo.date_received !== data[i].dateSent) {
                    await dbUpdateSchedule(obj);
                    let newSched = schedules.filter(schedule => schedule.id !== data[i].id)
                    newSched.push(obj);
                    finalData = [...finalData, ...newSched]
                }
            } else {
                await dbUpdateSchedule(obj);
                let newSched = [...schedules];
                newSched.push(obj);
                finalData = [...finalData, ...newSched]
            }
        }

        if (finalData.length > 0) {
          setSchedules(finalData);
        }
      }

      setOpenSyncDlg(false);
      setStartSync(false)
    }
  }, [apiHost, congID, congPIN, studentPIN, schedules, setOpenSyncDlg, setStartSync, setSchedules])

  useEffect(() => {
    if (startSync) {
      handleSyncSchedule()
    }
  }, [startSync, handleSyncSchedule])

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '50px !important',
          minHeight: '50px !important',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          sx={{
            height: '50px !important',
            minHeight: '50px !important',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              '@media screen and (max-width: 959px)': {
                fontSize: 0,
                marginRight: '2px',
                display: 'block',
              },
              '@media screen and (min-width: 960px)': {
                display: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Box sx={{display: "flex"}}>
              <Box
                sx={{
                  '@media screen and (max-width: 959px)': {
                    display: 'none',
                  },
                  '@media screen and (min-width: 960px)': {
                    marginRight: '3px',
                    display: 'block',
                  },
                }}
              >
                SWS Pocket |
              </Box>
              {appBarTitle}
            </Box>
          </Typography>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {(!isLoading && enabledInstall) && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{marginRight: '8px'}}
              onClick={() => handleInstallPwa()}
            >
              <GetApp />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => handleSyncSchedule()}
            sx={{marginRight: '5px'}}
          >
            <SyncIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleLogout}
            sx={{marginRight: '5px'}}
          >
            <LogoutIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => handleAbout()}
          >
            <InfoIcon />
          </IconButton>
        </Box>
      </AppBar>
      
      <Box
        component="nav"
        sx={{
          '@media screen and (min-width: 960px)': {
            width: drawerWidth,
            flexShrink: 0,
          },
        }}
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            '@media screen and (max-width: 959px)': {
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              display: 'block',
            },
            '@media screen and (min-width: 960px)': {
              display: 'none',
            },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backgroundColor: '#3f51b5',
              height: 50,
            }}
          >
            SWS Pocket
          </Typography>
          <AppDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            '@media screen and (min-width: 960px)': {
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              display: 'block',
            },
            '@media screen and (max-width: 959px)': {
              display: 'none',
            },
          }}
        >
          <Offset />
          <AppDrawer />
        </Drawer>  
      </Box>
    </Box>
  );
}
 
export default AppMenus;
