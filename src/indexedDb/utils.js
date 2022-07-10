import Dexie from 'dexie';
import { promiseSetRecoil } from 'recoil-outside';
import { scheduleDataState, sourceDataState } from '../states/schedule';
import appDb from './appDb';

export const isDbExist = async () => {
	try {
		const isExist = await Dexie.exists('sws_pocket');
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};

export const initAppDb = async () => {
	await appDb.open();
};

export const deleteAppDb = async () => {
	await Dexie.delete('sws_pocket');
};

export const loadAppData = async () => {
	const schedules = await appDb.cong_schedule.toCollection().first();
	await promiseSetRecoil(scheduleDataState, schedules);

	const sources = await appDb.cong_sourceMaterial.toCollection().first();
	await promiseSetRecoil(sourceDataState, sources);
};
