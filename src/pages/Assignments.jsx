import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MyAssignmentItem from '../components/reusable/MyAssignmentItem';
import { themeOptionsState } from '../states/theme';
import { myAssignmentsState } from '../states/schedule';

const Assignments = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const themeOptions = useRecoilValue(themeOptionsState);
	const myItems = useRecoilValue(myAssignmentsState);

	const upMd = useMediaQuery(theme.breakpoints.up('md'), {
		noSsr: true,
	});

	useEffect(() => {
		if (upMd) {
			navigate('/');
		}
	}, [navigate, upMd]);

	return (
		<Box>
			<Box>
				<Typography
					sx={{
						borderBottom: `1px solid ${themeOptions.borderPrimary}`,
						fontSize: '18px',
						marginBottom: '10px',
						fontWeight: 'bold',
					}}
				>
					{t('navAssignments')}
				</Typography>
				<Typography sx={{ fontSize: '14px' }}>
					{t('myAssignmentsDesc')}
				</Typography>
			</Box>
			<Box sx={{ marginTop: '10px' }}>
				{myItems.length > 0 &&
					myItems.map((assignment, index) => (
						<MyAssignmentItem
							key={`${assignment.weekOf}-${index}`}
							assignment={assignment}
						/>
					))}
			</Box>
		</Box>
	);
};

export default Assignments;
