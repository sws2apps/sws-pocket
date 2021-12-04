import appDb from "./mainDb";

export const dbGetScheduleAll = async () => {
    const appData = await appDb.table("schedule_data").toArray();
    return appData;
}

export const dbGetScheduleInfo = async (scheduleID) => {
    const appData = await appDb.table("schedule_data").get({"id": scheduleID});
    return appData;
}

export const dbUpdateSchedule = async (data) => {
    let obj = {};

    obj.id = data.id;
    obj.title = data.title;
    obj.date_received = data.date_received;
    obj.schedule_data = data.schedule_data;

    await appDb.table("schedule_data").put({...obj,}, obj.id)
}