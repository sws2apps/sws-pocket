import Dexie from 'dexie';

export const isDbExist = async () => {
	try {
		const isExist = await Dexie.exists('sws_pocket');
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};
