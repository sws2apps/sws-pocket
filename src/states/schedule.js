import { atom, selector } from 'recoil';
import { getI18n } from 'react-i18next';
import { langList } from '../locales/langList';
import { dbGetAppSettings } from '../indexedDb/appSettings';

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

export const myAssignmentsState = selector({
	key: 'myAssignments',
	get: async ({ get }) => {
		const { pocket_local_id, pocket_members } = await dbGetAppSettings();
		const schedules = get(scheduleLocalState);

		let myItems = [];
		for (let a = 0; a < schedules.length; a++) {
			const schedule = schedules[a];

			const classList = ['A', 'B'];
			const assignmentCn = [1, 2, 3, 4];

			// check bible reading
			classList.forEach((classItem) => {
				const assFldName = `bRead_stu_${classItem}`;
				const assFldDispName = `bRead_stu_${classItem}_dispName`;
				const fldValue = schedule[assFldName];
				const fldDispNameValue = schedule[assFldDispName];

				let obj = {};
				obj.weekOf = schedule.weekOf;
				obj.ass_type_name = {};

				langList.forEach((lang) => {
					obj.ass_type_name[lang.code] = getI18n().getDataByLanguage(
						lang.code
					).translation['bibleReading'];
				});

				obj.person_name = fldValue;
				obj.person_dispName = fldDispNameValue;
				obj.ass_source = schedule.bibleReading_src;

				if (fldValue === pocket_local_id) {
					obj.behalf = false;
					myItems.push(obj);
				} else if (
					pocket_members.some((member) => member.person_uid === fldValue)
				) {
					obj.behalf = true;
					myItems.push(obj);
				}

				obj = {};
			});
		}

		return myItems;
	},
});
