import Dexie from 'dexie';
import { getI18n } from 'react-i18next';
import { langList } from '../locales/langList';

let appDb = new Dexie('sws_pocket');

appDb.version(1).stores({
	app_settings: '&id, cong_number, cong_name, pocket_name pocket_members',
	midweek_meeting: '&schedule_id, students, other_parts',
	weekend_meeting: '&schedule_id, public_talks, other_parts',
	assignment_type: '&code, type_name, linkTo',
	week_type: '&week_id, type_name',
});

appDb.version(2).stores({
	app_settings: '&id, cong_number, cong_name, username, pocket_members',
	midweek_meeting: '&schedule_id, students, other_parts',
	weekend_meeting: '&schedule_id, public_talks, other_parts',
	assignment_type: '&code, type_name, linkTo',
	week_type: '&week_id, type_name',
});

appDb.on('populate', () => {
	// initialization of appSettings
	appDb.app_settings.add({
		id: 1,
		cong_number: 0,
		cong_name: '',
		pocket_name: '',
		pocket_members: [],
	});

	// initialization of weekType
	let coWeekObj = {};
	let convWeekObj = {};

	langList.forEach((lang) => {
		coWeekObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'circuitOverseerWeek'
		];
		convWeekObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'conventionWeek'
		];
	});

	appDb.week_type.bulkAdd([
		{
			week_id: 2,
			type_name: {
				...coWeekObj,
			},
		},
		{
			week_id: 3,
			type_name: {
				...convWeekObj,
			},
		},
	]);
});

export default appDb;
