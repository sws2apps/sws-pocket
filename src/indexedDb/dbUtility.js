import Dexie from 'dexie';
import appDb from './appDb';

export const initAppDb = async () => {
  await appDb.open();
};

export const deleteDbByName = async (dbName) => {
  await Dexie.delete(dbName);
};

export const deleteDb = async () => {
  const databases = await Dexie.getDatabaseNames();

  for (let i = 0; i < databases.length; i++) {
    Dexie.delete(databases[i]);
  }
};

export const isDbExist = async (dbName) => {
  return new Promise((resolve, reject) => {
    Dexie.exists(dbName)
      .then(function (exists) {
        if (exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(function (error) {
        reject('error');
      });
  });
};
