import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Assignments = () => {
	const theme = useTheme();
	const navigate = useNavigate();

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
				<Typography>My parts</Typography>
			</Box>
		</Box>
	);
};

export default Assignments;
