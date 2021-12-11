import appDb from './mainDb';

export const initAppDb = async () => {
    await appDb.open();
};

export const deleteDb = async () => {
    await appDb.close();
    await appDb.delete();
};
