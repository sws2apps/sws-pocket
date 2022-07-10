import { getI18n } from 'react-i18next';
import { atom, selector } from 'recoil';

export const scheduleDataState = atom({
	key: 'scheduleData',
	default: {},
});

export const sourceDataState = atom({
	key: 'sourceDataState',
	default: {},
});

export const scheduleLocalState = selector({
	key: 'scheduleLocal',
	get: ({ get }) => {
		const schedules = get(scheduleDataState);
		const sources = get(sourceDataState);

		let schedule = [];
		// loop through all schedules to build weekly schedule
		const { students } = schedules;
		if (students) {
			for (let a = 0; a < students.length; a++) {
				const schedules = students[a].schedules;
				for (let b = 0; b < schedules.length; b++) {
					schedule.push(schedules[b]);
				}
			}
		}

		// loop through all sources to build weekly schedule
		const srcStudents = sources.students;
		if (srcStudents) {
			for (let a = 0; a < srcStudents.length; a++) {
				const src = srcStudents[a].sources;
				for (let b = 0; b < src.length; b++) {
					const weekData = src[b];

					let obj = {};
					obj = { ...weekData };

					// find existing week in schedule
					const found = schedule.find(
						(week) => week.weekOf === weekData.weekOf
					);

					if (found) {
						obj = { ...obj, ...found };
						schedule = [
							...schedule.filter((week) => week.weekOf !== weekData.weekOf),
						];
					}

					schedule.push(obj);
				}
			}
		}

		return schedule;
	},
});
