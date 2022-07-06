import { useRecoilValue } from 'recoil';
import About from './About';
import ApplicationBar from './AppBar';
import Box from '@mui/material/Box';
import ScheduleUpdater from './ScheduleUpdater';
import { isAboutOpenState, isRefreshScheduleOpenState } from '../../states/app';

const Layout = ({ children }) => {
	const isOpenAbout = useRecoilValue(isAboutOpenState);
	const isOpenRefresh = useRecoilValue(isRefreshScheduleOpenState);

	return (
		<Box>
			{isOpenAbout && <About />}

			<ApplicationBar />
			<Box sx={{ marginTop: '60px' }}>
				{isOpenRefresh && <ScheduleUpdater />}

				<Box sx={{ padding: '0 10px 20px 10px' }}>{children}</Box>
			</Box>
		</Box>
	);
};

export default Layout;
