import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Box from '@mui/material/Box';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MenuCard from '../components/MenuCard';
import { isMyAssignmentOpenState } from '../states/main';
import { congAccountConnectedState } from '../states/congregation';
import { apiFetchSchedule } from '../utils/api';

const DashboardMenu = () => {
  const { t } = useTranslation();

  const setMyAssignmentsOpen = useSetRecoilState(isMyAssignmentOpenState);

  const isCongAccountConnected = useRecoilValue(congAccountConnectedState);

  const handleOpenMyAssignment = () => {
    setMyAssignmentsOpen(true);
  };

  const dashboardMenus = [
    {
      title: t('meetingSchedule'),
      visible: true,
      links: [
        {
          title: t('viewMyAssignments'),
          icon: <AssignmentIndIcon />,
          visible: true,
          action: handleOpenMyAssignment,
        },
        {
          title: t('viewAssignmentsSchedule'),
          icon: <ScheduleIcon />,
          visible: true,
          navigateTo: '/meeting-schedule',
        },
        {
          title: t('refreshSchedule'),
          icon: <CloudSyncIcon />,
          visible: isCongAccountConnected,
          action: apiFetchSchedule,
        },
      ],
    },
  ];

  return (
    <Box sx={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {dashboardMenus.map((menu) => (
        <MenuCard key={`menu-item-${menu.title}`} menu={menu} />
      ))}
    </Box>
  );
};

export default DashboardMenu;
