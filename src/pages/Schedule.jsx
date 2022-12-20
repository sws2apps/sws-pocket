import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useMediaQuery, useTheme } from '@mui/material';
import Assignments from './Assignments';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Stack from '@mui/material/Stack';
import StudentAssigned from '../components/reusable/StudentAssigned';
import Typography from '@mui/material/Typography';
import {
	appMessageState,
	appSeverityState,
	appSnackOpenState,
} from '../states/notification';
import { scheduleLocalState } from '../states/schedule';
import { formatWeekName } from '../utils/date';

const styles = {
	navBtnHome: {
		padding: '0 30px',
	},
	navBtnPrevNext: {
		padding: '0 10px',
	},
	navIcon: {
		fontSize: '40px',
	},
	boxMeetingPart: {
		maxWidth: '100%',
		minWidth: '320px',
		borderRadius: '10px',
		padding: '3px 10px',
		color: 'white',
		marginTop: '10px',
		marginBottom: '5px',
	},
};

const Schedule = () => {
	const theme = useTheme();
	const { t, i18n } = useTranslation();

	const setAppSnackOpen = useSetRecoilState(appSnackOpenState);
	const setAppSeverity = useSetRecoilState(appSeverityState);
	const setAppMessage = useSetRecoilState(appMessageState);

	const schedules = useRecoilValue(scheduleLocalState);

	const [isLoading, setIsLoading] = useState(true);
	const [currentWeek, setCurrentWeek] = useState('');
	const [currentWeekDate, setCurrentWeekDate] = useState('');
	const [bibleReadingSrc, setBibleReadingSrc] = useState('');
	const [stuBReadA, setStuBReadA] = useState('');
	const [stuBReadB, setStuBReadB] = useState('');
	const [ass1TypeName, setAss1TypeName] = useState('');
	const [ass1Time, setAss1Time] = useState('');
	const [ass1Src, setAss1Src] = useState('');
	const [stu1A, setStu1A] = useState('');
	const [ass1A, setAss1A] = useState('');
	const [stu1B, setStu1B] = useState('');
	const [ass1B, setAss1B] = useState('');
	const [ass2TypeName, setAss2TypeName] = useState('');
	const [ass2Time, setAss2Time] = useState('');
	const [ass2Src, setAss2Src] = useState('');
	const [stu2A, setStu2A] = useState('');
	const [ass2A, setAss2A] = useState('');
	const [stu2B, setStu2B] = useState('');
	const [ass2B, setAss2B] = useState('');
	const [ass3TypeName, setAss3TypeName] = useState('');
	const [ass3Time, setAss3Time] = useState('');
	const [ass3Src, setAss3Src] = useState('');
	const [stu3A, setStu3A] = useState('');
	const [ass3A, setAss3A] = useState('');
	const [stu3B, setStu3B] = useState('');
	const [ass3B, setAss3B] = useState('');
	const [ass4TypeName, setAss4TypeName] = useState('');
	const [ass4Time, setAss4Time] = useState('');
	const [ass4Src, setAss4Src] = useState('');
	const [stu4A, setStu4A] = useState('');
	const [ass4A, setAss4A] = useState('');
	const [stu4B, setStu4B] = useState('');
	const [ass4B, setAss4B] = useState('');
	const [previousWeek, setPreviousWeek] = useState('');
	const [nextWeek, setNextWeek] = useState('');
	const [disablePrevious, setDisablePrevious] = useState(false);
	const [disableNext, setDisableNext] = useState(false);

	const upMd = useMediaQuery(theme.breakpoints.up('md'), {
		noSsr: true,
	});

	const handleActiveWeek = useCallback(() => {
		var today = new Date();
		var day = today.getDay();
		var diff = today.getDate() - day + (day === 0 ? -6 : 1);
		var monDay = new Date(today.setDate(diff));
		setCurrentWeek(format(monDay, 'MM/dd/yyyy'));
	}, []);

	const handlePreviousWeek = () => {
		setCurrentWeek(previousWeek);
	};

	const handleNextWeek = () => {
		setCurrentWeek(nextWeek);
	};

	const loadWeekData = useCallback(async () => {
		try {
			setIsLoading(true);
			const appLang = i18n.language;

			if (schedules) {
				const schedule = schedules.find((data) => data.weekOf === currentWeek);

				let result = new Date(currentWeek);
				result.setDate(result.getDate() - 7);
				let previousWeek = format(result, 'MM/dd/yyyy');
				let hasPrevious = schedules.find((data) => data.weekOf === previousWeek)
					? true
					: false;
				if (!hasPrevious) {
					result.setDate(result.getDate() - 7);
					previousWeek = format(result, 'MM/dd/yyyy');
					hasPrevious = schedules.find((data) => data.weekOf === previousWeek)
						? true
						: false;
				}
				setDisablePrevious(!hasPrevious);
				setPreviousWeek(previousWeek);

				result = new Date(currentWeek);
				result.setDate(result.getDate() + 7);
				let nextWeek = format(result, 'MM/dd/yyyy');
				let hasNext = schedules.find((data) => data.weekOf === nextWeek)
					? true
					: false;
				if (!hasNext) {
					result.setDate(result.getDate() + 7);
					nextWeek = format(result, 'MM/dd/yyyy');
					hasNext = schedules.find((data) => data.weekOf === nextWeek)
						? true
						: false;
				}
				setDisableNext(!hasNext);
				setNextWeek(nextWeek);

				if (schedule) {
					const dFormat = await formatWeekName(schedule.weekOf);
					setCurrentWeekDate(dFormat);
					setBibleReadingSrc(schedule.bibleReading_src ? schedule.bibleReading_src[appLang] : '');
					setStuBReadA(schedule.bRead_stu_A_dispName);
					setStuBReadB(schedule.bRead_stu_B_dispName);
					setAss1TypeName(schedule.ass1_type_name ? schedule.ass1_type_name[appLang] : '');
					setAss1Src(schedule.ass1_src ? schedule.ass1_src[appLang] : '');
					setAss1Time(schedule.ass1_time);
					setStu1A(schedule.ass1_stu_A_dispName);
					setAss1A(schedule.ass1_ass_A_dispName);
					setStu1B(schedule.ass1_stu_B_dispName);
					setAss1B(schedule.ass1_ass_B_dispName);
					setAss2TypeName(schedule.ass2_type_name ? schedule.ass2_type_name[appLang] : '');
					setAss2Src(schedule.ass2_src ? schedule.ass2_src[appLang] : '');
					setAss2Time(schedule.ass2_time);
					setStu2A(schedule.ass2_stu_A_dispName);
					setAss2A(schedule.ass2_ass_A_dispName);
					setStu2B(schedule.ass2_stu_B_dispName);
					setAss2B(schedule.ass2_ass_B_dispName);
					setAss3TypeName(schedule.ass3_type_name ? schedule.ass3_type_name[appLang] : '');
					setAss3Src(schedule.ass3_src ? schedule.ass3_src[appLang] : '');
					setAss3Time(schedule.ass3_time);
					setStu3A(schedule.ass3_stu_A_dispName);
					setAss3A(schedule.ass3_ass_A_dispName);
					setStu3B(schedule.ass3_stu_B_dispName);
					setAss3B(schedule.ass3_ass_B_dispName);
					setAss4TypeName(schedule.ass4_type_name ? schedule.ass4_type_name[appLang] : '');
					setAss4Src(schedule.ass4_src ? schedule.ass4_src[appLang] : '');
					setAss4Time(schedule.ass4_time);
					setStu4A(schedule.ass4_stu_A_dispName);
					setAss4A(schedule.ass4_ass_A_dispName);
					setStu4B(schedule.ass4_stu_B_dispName);
					setAss4B(schedule.ass4_ass_B_dispName);
					setIsLoading(false);
					return;
				}

				setIsLoading(false);
				return;
			}

			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setAppMessage(t('scheduleLoadError'));
			setAppSeverity('warning');
			setAppSnackOpen(true);
		}
	}, [
		currentWeek,
		i18n,
		t,
		schedules,
		setAppMessage,
		setAppSeverity,
		setAppSnackOpen,
	]);

	useEffect(() => {
		if (currentWeek !== '') {
			loadWeekData();
		}
	}, [currentWeek, loadWeekData]);

	useEffect(() => {
		handleActiveWeek();
	}, [handleActiveWeek]);

	return (
		<Box>
			<Stack direction='row' spacing={2}>
				<Box sx={{ flexGrow: 1 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<IconButton
							sx={styles.navBtnPrevNext}
							onClick={handlePreviousWeek}
							disabled={disablePrevious}
						>
							<SkipPreviousIcon sx={styles.navIcon} />
						</IconButton>
						<IconButton sx={styles.navBtnHome} onClick={handleActiveWeek}>
							<HomeIcon sx={styles.navIcon} />
						</IconButton>
						<IconButton
							sx={styles.navBtnPrevNext}
							onClick={handleNextWeek}
							disabled={disableNext}
						>
							<SkipNextIcon sx={styles.navIcon} />
						</IconButton>
					</Box>

					{isLoading && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '50px',
							}}
						>
							<CircularProgress
								color='secondary'
								size={50}
								disableShrink={true}
							/>
						</Box>
					)}
					{!isLoading && (
						<Box sx={{ marginTop: '5px' }}>
							<Box
								sx={{
									backgroundColor: '#B2BABB',
									color: 'black',
									padding: '5px',
									borderRadius: '5px',
								}}
							>
								<Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
									{currentWeekDate}
								</Typography>
								<Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
									{t('midweekMeeting')}
								</Typography>
							</Box>

							<Box
								sx={{ ...styles.boxMeetingPart, backgroundColor: '#656164' }}
							>
								<Typography variant='h6' sx={{ lineHeight: 1.3 }}>
									{t('treasuresPart')}
								</Typography>
							</Box>

							<Typography>
								<Typography component='span' sx={{ fontWeight: 'bold' }}>
									{`${t('bibleReading')}: `}
								</Typography>
								(4 min.) {bibleReadingSrc}
							</Typography>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								{stuBReadA !== '' && <StudentAssigned name={stuBReadA} />}
								{stuBReadB !== '' && <StudentAssigned name={stuBReadB} />}
							</Box>

							<Box
								sx={{ ...styles.boxMeetingPart, backgroundColor: '#a56803' }}
							>
								<Typography variant='h6' sx={{ lineHeight: 1.3 }}>
									{t('fieldMinistryPart')}
								</Typography>
							</Box>

							{ass1TypeName && (
								<Box sx={{ marginBottom: '10px' }}>
									<Typography>
										<Typography component='span' sx={{ fontWeight: 'bold' }}>
											{`${ass1TypeName}: `}
										</Typography>
										{`(${ass1Time} min.) ${ass1Src}`}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu1A !== '' && <StudentAssigned name={stu1A} />}
											{ass1A !== '' && <StudentAssigned name={ass1A} />}
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu1B !== '' && <StudentAssigned name={stu1B} />}
											{ass1B !== '' && <StudentAssigned name={ass1B} />}
										</Box>
									</Box>
								</Box>
							)}

							{ass2TypeName && (
								<Box sx={{ marginBottom: '10px' }}>
									<Typography>
										<Typography component='span' sx={{ fontWeight: 'bold' }}>
											{`${ass2TypeName}: `}
										</Typography>
										{`(${ass2Time} min.) ${ass2Src}`}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu2A !== '' && <StudentAssigned name={stu2A} />}
											{ass2A !== '' && <StudentAssigned name={ass2A} />}
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu2B !== '' && <StudentAssigned name={stu2B} />}
											{ass2B !== '' && <StudentAssigned name={ass2B} />}
										</Box>
									</Box>
								</Box>
							)}

							{ass3TypeName && (
								<Box sx={{ marginBottom: '10px' }}>
									<Typography>
										<Typography component='span' sx={{ fontWeight: 'bold' }}>
											{`${ass3TypeName}: `}
										</Typography>
										{`(${ass3Time} min.) ${ass3Src}`}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu3A !== '' && <StudentAssigned name={stu3A} />}
											{ass3A !== '' && <StudentAssigned name={ass3A} />}
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu3B !== '' && <StudentAssigned name={stu3B} />}
											{ass3B !== '' && <StudentAssigned name={ass3B} />}
										</Box>
									</Box>
								</Box>
							)}

							{ass4TypeName && (
								<Box sx={{ marginBottom: '10px' }}>
									<Typography>
										<Typography component='span' sx={{ fontWeight: 'bold' }}>
											{`${ass4TypeName}: `}
										</Typography>
										{`(${ass4Time} min.) ${ass4Src}`}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu4A !== '' && <StudentAssigned name={stu4A} />}
											{ass4A !== '' && <StudentAssigned name={ass4A} />}
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{stu4B !== '' && <StudentAssigned name={stu4B} />}
											{ass4B !== '' && <StudentAssigned name={ass4B} />}
										</Box>
									</Box>
								</Box>
							)}
						</Box>
					)}
				</Box>
				{upMd && (
					<Box
						sx={{
							minWidth: '400px',
							maxWidth: '400px',
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
