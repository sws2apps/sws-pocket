import Dexie from 'dexie';

let appDb = new Dexie('sws_pocket');

appDb.version(1).stores({
	pocket_settings: '&id, cong_number, cong_name, username, pocket_members',
	cong_schedule:
		'++schedule_id, students, midweek_otherParts, weekend_talk, weekend_otherParts',
	cong_sourceMaterial:
		'++source_id, students, midweek_otherParts, weekend_talk, weekend_otherParts',
});

appDb.on('populate', () => {
	// initialization of appSettings
	appDb.pocket_settings.add({
		id: 1,
		cong_number: 0,
		cong_name: '',
		username: '',
		pocket_members: [],
	});
});

export default appDb;
