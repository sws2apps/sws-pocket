import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Box';

const MyAssignmentItem = ({ behalf }) => {
	return (
		<Box
			sx={{
				border: `1px solid ${behalf ? 'crimson' : 'green'}`,
				borderRadius: '5px',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<CalendarMonthIcon
					sx={{ fontSize: '50px', color: `${behalf ? 'crimson' : 'green'}` }}
				/>
				<Box>
					<Typography>Date</Typography>
					<Typography sx={{ fontSize: '14px' }}>Assignment</Typography>
				</Box>
			</Box>
			<Box sx={{ padding: '10px' }}>
				<Typography>Assignment description</Typography>
			</Box>
		</Box>
	);
};

export default MyAssignmentItem;
