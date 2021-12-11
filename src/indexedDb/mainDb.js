import Dexie from "dexie";

var appDb = new Dexie("sws_pocket");

appDb.version(1).stores(
    {
        app_settings: "++id, cong_id, cong_PIN, student_PIN, viewStudent_Part",
        schedule_data: "&id, title, date_received, schedule_data",
    }
);

appDb.version(2).stores(
    {
        app_settings: "++id, cong_id, cong_PIN, student_PIN, id_lmm_oa, viewStudent_Part",
    }
);

appDb.version(3).stores(
    {
        app_settings: "++id, cong_id, cong_PIN, class_count, student_PIN, student_name, id_lmm_oa, viewStudent_Part",
    }
);

appDb.on("populate", function() {
    appDb.app_settings.add({
        id: 1,
        cong_id: '',
        cong_PIN: '',
        student_PIN: '',
        id_lmm_oa: '',
        viewStudent_Part: [],
    });
});

export default appDb;