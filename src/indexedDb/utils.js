import Dexie from 'dexie';
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
