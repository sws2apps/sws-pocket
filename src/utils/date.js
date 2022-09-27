import { getI18n } from 'react-i18next';
import { langList } from '../locales/langList';

export const formatWeekName = async (date) => {
	const appLang = getI18n().language;
	const months = langList.find((lang) => lang.code === appLang).months;

	const startDay = +date.split('/')[1];
	const startMonth = +date.split('/')[0] - 1;
	const startYear = +date.split('/')[2];

	const startDate = new Date(startYear, startMonth, startDay);
	let endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 6);

	const endDay = endDate.getDate();
	const endMonth = endDate.getMonth();
	const endYear = endDate.getFullYear();

	const isMonthSame = startMonth === endMonth;
	const isYearSame = startYear === endYear;

	if (!isYearSame) {
		if (appLang === 'E') {
			return `${months[startMonth]} ${startDay}, ${startYear}–${months[endMonth]} ${endDay}, ${endYear}`;
		}

		if (appLang === 'MG') {
			return `${startDay} ${months[startMonth]} ${startYear}–${endDay} ${months[endMonth]} ${endYear}`;
		}
	}

	if (!isMonthSame) {
		if (appLang === 'E') {
			return `${months[startMonth]} ${startDay}–${months[endMonth]} ${endDay}`;
		}

		if (appLang === 'MG') {
			return `${startDay} ${months[startMonth]}–${endDay} ${months[endMonth]}`;
		}
	}

	if (appLang === 'E') {
		return `${months[startMonth]} ${startDay}-${endDay}`;
	}

	if (appLang === 'MG') {
		return `${startDay}-${endDay} ${months[startMonth]}`;
	}
};
