import appDb from './appDb';

export const dbUpdateSettings = async (value) => {
	await appDb.app_settings.update(1, {
		...value,
	});
};

export const dbGetAppSettings = async () => {
	const congData = await appDb.app_settings.get({ id: 1 });
	return congData;
};