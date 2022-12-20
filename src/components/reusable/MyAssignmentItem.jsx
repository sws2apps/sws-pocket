import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Box';

const MyAssignmentItem = ({ assignment }) => {
	const { t, i18n } = useTranslation();

	const {
		ass_source,
		ass_type_name,
		assistant_dispName,
		behalf,
		isAssistant,
		person_dispName,
		weekOf,
	} = assignment;
	const appLang = i18n.language;

	const [weekDateFormatted, setWeekDateFormatted] = useState('');
	const [assTypeName, setAssTypeName] = useState('');
	const [assSrc, setAssSrc] = useState('');

	const getAssignmentInfo = useCallback(() => {
		const fDate = format(new Date(weekOf), t('shortDateFormat'));
		setWeekDateFormatted(fDate);
		setAssTypeName(ass_type_name ? ass_type_name[appLang] : '');
		setAssSrc(ass_source ? ass_source[appLang] : '');
	}, [appLang, ass_source, ass_type_name, t, weekOf]);

	useEffect(() => {
		getAssignmentInfo();
	}, [getAssignmentInfo]);

	return (
		<Box
			sx={{
				border: `1px solid ${behalf ? 'blue' : 'green'}`,
				borderRadius: '5px',
				marginBottom: '15px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					padding: '0 10px',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<Typography sx={{ fontWeight: 'bold' }}>{assTypeName}</Typography>
					<Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
						{weekDateFormatted}
					</Typography>
				</Box>
				<CalendarMonthIcon
					sx={{ fontSize: '50px', color: `${behalf ? 'blue' : 'green'}` }}
				/>
			</Box>
			<Box sx={{ padding: '10px' }}>
				{behalf && (
					<Typography>
						<Typography component='span' sx={{ fontWeight: 'bold' }}>
							{t('partOnBehalf')}
						</Typography>
						{isAssistant ? assistant_dispName : person_dispName}
					</Typography>
				)}
				{isAssistant !== undefined && (
					<Typography>
						<Typography component='span' sx={{ fontWeight: 'bold' }}>
							{`${isAssistant ? t('student') : t('assistant')}: `}
						</Typography>
						{isAssistant ? person_dispName : assistant_dispName}
					</Typography>
				)}
				<Typography sx={{ fontSize: '14px' }}>{assSrc}</Typography>
			</Box>
		</Box>
	);
};

export default MyAssignmentItem;
