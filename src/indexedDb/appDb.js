import Dexie from 'dexie';

let appDb = new Dexie('sws_pocket');

appDb.version(1).stores({
  pocket_settings: '&id, cong_number, cong_name, username, pocket_members',
  cong_schedule: '++schedule_id, students, midweek_otherParts, weekend_talk, weekend_otherParts',
  cong_sourceMaterial: '++source_id, students, midweek_otherParts, weekend_talk, weekend_otherParts',
});
appDb.version(2).stores({
  pocket_settings: '&id, cong_number, cong_name, username, pocket_members, pocket_local_id',
});
appDb.version(3).stores({
  pocket_settings: '&id, cong_number, cong_name, cong_role, username, pocket_members, pocket_local_id',
});
appDb.version(4).stores({
  pocket_settings: '&id, cong_number, cong_name, cong_role, username, pocket_members, pocket_local_id, user_id',
});
appDb.version(5).stores({
  pocket_settings:
    '&id, class_count, cong_number, cong_name, cong_role, username, pocket_members, pocket_local_id, source_lang, user_id',
});
appDb.version(6).stores({
  pocket_settings:
    '&id, class_count, cong_number, cong_name, cong_role, username, pocket_members, pocket_local_id, source_lang, user_id, co_name, co_displayName',
});
appDb.version(7).stores({
  announcements: '&announcement_id, title, body',
});

appDb.on('populate', () => {
  // initialization of appSettings
  appDb.pocket_settings.add({
    id: 1,
    class_count: 1,
    cong_number: 0,
    cong_name: '',
    username: '',
    source_lang: 'e',
    pocket_members: [],
  });
});

export default appDb;
