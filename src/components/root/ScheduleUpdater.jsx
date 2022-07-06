// import { useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// import { isRefreshScheduleOpenState } from '../../states/app';

const ScheduleUpdater = () => {
	// const setOpen = useSetRecoilState(isRefreshScheduleOpenState);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				boxSizing: 'border-box',
				marginRight: '10px',
				marginBottom: '15px',
			}}
		>
			<CircularProgress disableShrink color='secondary' size={'20px'} />
		</Box>
	);
};

export default ScheduleUpdater;
