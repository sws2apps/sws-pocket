import { useRecoilValue } from 'recoil';
import { useMediaQuery, useTheme } from '@mui/material';
import Assignments from './Assignments';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { themeOptionsState } from '../states/theme';

const Schedule = () => {
	const theme = useTheme();

	const themeOptions = useRecoilValue(themeOptionsState);

	const upMd = useMediaQuery(theme.breakpoints.up('md'), {
		noSsr: true,
	});

	return (
		<Box>
			<Stack direction='row' spacing={2}>
				<Box
					sx={{
						flexGrow: 1,
						border: upMd ? `1px solid ${themeOptions.borderPrimary}` : '',
						borderRadius: '8px',
					}}
				>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
						saepe dolores molestiae at nihil asperiores, repellendus assumenda,
						porro aliquam, voluptatibus facilis numquam magni architecto.
						Inventore reprehenderit veritatis voluptatum fugiat autem.
					</p>
				</Box>
				{upMd && (
					<Box
						sx={{
							border: `1px solid ${themeOptions.borderPrimary}`,
							minWidth: '400px',
							maxWidth: '400px',
							borderRadius: '8px',
						}}
					>
						<Assignments />
					</Box>
				)}
			</Stack>
		</Box>
	);
};

export default Schedule;
