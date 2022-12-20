import { atom, selector } from "recoil";
import { getI18n } from "react-i18next";
import { langList } from "../locales/langList";
import { dbGetAppSettings } from "../indexedDb/appSettings";

export const scheduleDataState = atom({
  key: "scheduleData",
  default: {},
});

export const sourceDataState = atom({
  key: "sourceDataState",
  default: {},
});

export const scheduleLocalState = selector({
  key: "scheduleLocal",
  get: ({ get }) => {
    const schedules = get(scheduleDataState);
    const sources = get(sourceDataState);

    let schedule = [];

    if (schedules && sources) {
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
    }

    return schedule;
  },
});

export const myAssignmentsState = selector({
  key: "myAssignments",
  get: async ({ get }) => {
    const { pocket_local_id, pocket_members } = await dbGetAppSettings();
    const schedules = get(scheduleLocalState);

    const d = new Date();
    const todayDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayValue = todayDate.getDay();
    const diff = todayDate.getDate() - dayValue + (dayValue === 0 ? -6 : 1);
    const currentWeekDate = new Date(todayDate.setDate(diff));

    const msInDay = 24 * 60 * 60 * 1000;

    let myItems = [];
    for (let a = 0; a < schedules.length; a++) {
      const schedule = schedules[a];

      const weekDate = new Date(schedule.weekOf);

      const dayDiff = Math.round((weekDate - currentWeekDate) / msInDay);

      if (dayDiff >= 0) {
        const classList = ["A", "B"];
        const assignmentCn = [1, 2, 3, 4];

        classList.forEach((classItem) => {
          // check bible reading
          let stuFldName = `bRead_stu_${classItem}`;
          let stuFldDispName = `bRead_stu_${classItem}_dispName`;
          let fldValue = schedule[stuFldName];
          let fldDispNameValue = schedule[stuFldDispName];

          let obj = {};
          obj.weekOf = schedule.weekOf;
          obj.ass_type_name = {};

          langList.forEach((lang) => {
            obj.ass_type_name[lang.code] = getI18n().getDataByLanguage(
              lang.code
            ).translation["bibleReading"];
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

          // AYF assignments
          assignmentCn.forEach((index) => {
            stuFldName = `ass${index}_stu_${classItem}`;
            stuFldDispName = `ass${index}_stu_${classItem}_dispName`;
            fldValue = schedule[stuFldName];
            fldDispNameValue = schedule[stuFldDispName];
            let assFldName = `ass${index}_ass_${classItem}`;
            let assFldDispName = `ass${index}_ass_${classItem}_dispName`;
            let fldAssValue = schedule[assFldName];
            let fldAssDispNameValue = schedule[assFldDispName];
            let srcFldName = `ass${index}_src`;
            let fldSrcValue = schedule[srcFldName];
            let typeFldName = `ass${index}_type_name`;
            let fldTypeValue = schedule[typeFldName];

            // student
            obj.weekOf = schedule.weekOf;
            obj.ass_source = fldSrcValue;
            obj.ass_type_name = fldTypeValue;
            obj.person_name = fldValue;
            obj.person_dispName = fldDispNameValue;
            obj.assistant_name = fldAssValue;
            obj.assistant_dispName = fldAssDispNameValue;
            obj.isAssistant = false;

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
            // assistant
            obj.weekOf = schedule.weekOf;
            obj.ass_source = fldSrcValue;
            obj.ass_type_name = fldTypeValue;
            obj.person_name = fldValue;
            obj.person_dispName = fldDispNameValue;
            obj.assistant_name = fldAssValue;
            obj.assistant_dispName = fldAssDispNameValue;

            let assTypeName = {};
            if (fldTypeValue) {
              for (const [key, value] of Object.entries(fldTypeValue)) {
                assTypeName[key] = `${value} (${
                  getI18n().getDataByLanguage(key).translation["assistant"]
                })`;
              }
            }

            obj.isAssistant = true;
            obj.ass_type_name = assTypeName;

            if (fldAssValue === pocket_local_id) {
              obj.behalf = false;
              myItems.push(obj);
            } else if (
              pocket_members.some((member) => member.person_uid === fldAssValue)
            ) {
              obj.behalf = true;
              myItems.push(obj);
            }

            obj = {};
          });
        });
      }
    }

    return myItems;
  },
});
