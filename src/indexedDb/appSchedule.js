import { promiseSetRecoil } from 'recoil-outside';
import { scheduleDataState, sourceDataState } from '../states/schedule';
import appDb from './appDb';

export const dbUpdateSchedule = async (data) => {
	const { cong_schedule, cong_sourceMaterial } = data;

	// updating schedule
	await appDb.cong_schedule.clear();
	await appDb.cong_schedule.add(cong_schedule);
	await promiseSetRecoil(scheduleDataState, cong_schedule);

	// updating source
	await appDb.cong_sourceMaterial.clear();
	await appDb.cong_sourceMaterial.add(cong_sourceMaterial);
	await promiseSetRecoil(sourceDataState, cong_sourceMaterial);
};
