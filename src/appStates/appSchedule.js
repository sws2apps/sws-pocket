import { atom, selector } from "recoil";

export const startSyncState = atom({
    key: 'startSync',
    default: false,
})

export const scheduleState = atom({
    key: 'appSchedule',
    default: [],
})

export const weeklyScheduleState = selector({
    key: 'weeklySchedule',
    get: ({ get }) => {
        const schedules = get(scheduleState);
        let data = [];

        for (let i=0; i < schedules.length; i++) {
            const schedData = schedules[i].schedule_data;
            for (let a=0; a < schedData.length; a++) {
                data.push(schedData[a])
            }
        }

        data.sort((a, b) => {
            var dateA = a.weekOf.split("/")[2] + "/" + a.weekOf.split("/")[0] + "/" + a.weekOf.split("/")[1];
            var dateB = b.weekOf.split("/")[2] + "/" + b.weekOf.split("/")[0] + "/" + b.weekOf.split("/")[1];
            return dateA > dateB ? 1 : -1;
        });

        return data;
    }
})

export const formatScheduleState = selector({
    key: 'appScheduleFormat',
    get: ({ get }) => {
        let data = get(weeklyScheduleState);

        var dateFormat = require("dateformat");
        var today = new Date();
        var day = today.getDay();
        var diff = today.getDate() - day + (day === 0 ? -6:1);
        var monDay = new Date(today.setDate(diff));
        const weekFilter = dateFormat(monDay, "yyyy/mm/dd");

        let filteredData = data.filter(a => {
            var dateA = a.weekOf.split("/")[2] + "/" + a.weekOf.split("/")[0] + "/" + a.weekOf.split("/")[1];
            return dateA < weekFilter ? false : true;
        });

        let allWeeks = [];
        let key = 0;

        for(let i=0; i < filteredData.length; i++) {
            const weekDate = filteredData[i].weekOf;
            const month = weekDate.split("/")[0];
            const year = weekDate.split("/")[2];
            var monthName = "";
            var mainOption = {};
    
            if (month === "01") {
                monthName = "Janoary"
            } else if (month === "02") {
                monthName = "Febroary"
            } else if (month === "03") {
                monthName = "Martsa"
            } else if (month === "04") {
                monthName = "Aprily"
            } else if (month === "05") {
                monthName = "Mey"
            } else if (month === "06") {
                monthName = "Jona"
            } else if (month === "07") {
                monthName = "Jolay"
            } else if (month === "08") {
                monthName = "Aogositra"
            } else if (month === "09") {
                monthName = "Septambra"
            } else if (month === "10") {
                monthName = "Oktobra"
            } else if (month === "11") {
                monthName = "Novambra"
            } else if (month === "12") {
                monthName = "Desambra"
            }
            const tempMain = monthName + " " + year;
            const monthIndex = allWeeks.findIndex(monthData => monthData.month === tempMain);
    
            if (monthIndex < 0) {
                mainOption.month = tempMain;
                mainOption.key = key;
                key++;
                mainOption.weeks = [];
                mainOption.weeks.push(filteredData[i]);
    
                allWeeks.push(mainOption);
            } else {
                var subOptionData = [];
                subOptionData = allWeeks[monthIndex].weeks;
                subOptionData.push(filteredData[i]);
                allWeeks[monthIndex].weeks = subOptionData;
            }
        }

        return allWeeks;
    }
})