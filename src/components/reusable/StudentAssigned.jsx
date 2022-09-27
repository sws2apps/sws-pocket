import { useRecoilValue } from 'recoil';
import Typography from '@mui/material/Typography';
import { themeOptionsState } from '../../states/theme';

const StudentAssigned = ({ name }) => {
	const themeOptions = useRecoilValue(themeOptionsState);

	return (
		<Typography
			sx={{
				height: '25px',
				lineHeight: '25px',
				width: '165px',
				backgroundColor: themeOptions.backgroundStudent,
				color: 'purple',
				padding: '2px 2px 2px 5px',
				borderRadius: '5px',
				fontWeight: 'bold',
				margin: '0 0 2px 10px',
			}}
		>
			{name}
		</Typography>
	);
};

export default StudentAssigned;
