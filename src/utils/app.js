import { promiseGetRecoil, promiseSetRecoil } from 'recoil-outside';
import { getI18n } from 'react-i18next';
import { initAppDb } from '../indexedDb/dbUtility';
import { dbSaveNotifications } from '../indexedDb/dbNotifications';
import { apiHostState, appLangState, isOnlineState, sourceLangState } from '../states/main';
import { dbGetAppSettings } from '../indexedDb/dbAppSettings';
import {
  classCountState,
  congNameState,
  congNumberState,
  pocketLocalIDState,
  pocketMembersState,
  usernameState,
} from '../states/congregation';
import appDb from '../indexedDb/appDb';
import { scheduleDataState, sourceDataState } from '../states/schedule';

export const loadApp = async () => {
  const I18n = getI18n();

  await initAppDb();
  const app_lang = localStorage.getItem('app_lang') || 'e';
  let { username, cong_number, cong_name, class_count, pocket_local_id, pocket_members, source_lang } =
    await dbGetAppSettings();

  await promiseSetRecoil(usernameState, username || '');
  await promiseSetRecoil(congNameState, cong_name || '');
  await promiseSetRecoil(congNumberState, cong_number || '');
  await promiseSetRecoil(classCountState, class_count || 1);
  await promiseSetRecoil(appLangState, app_lang || 'e');
  await promiseSetRecoil(sourceLangState, source_lang || 'e');
  await promiseSetRecoil(pocketLocalIDState, pocket_local_id?.person_uid || '');
  await promiseSetRecoil(pocketMembersState, pocket_members || []);

  I18n.changeLanguage(app_lang);

  const schedules = await appDb.cong_schedule.toCollection().first();
  await promiseSetRecoil(scheduleDataState, schedules);

  const sources = await appDb.cong_sourceMaterial.toCollection().first();
  await promiseSetRecoil(sourceDataState, sources);
};

export const fetchNotifications = async () => {
  try {
    const isOnline = await promiseGetRecoil(isOnlineState);
    const apiHost = await promiseGetRecoil(apiHostState);

    if (isOnline && apiHost !== '') {
      const res = await fetch(`${apiHost}api/users/announcement`, {
        method: 'GET',
      });

      const data = await res.json();
      await dbSaveNotifications(data);
    }
  } catch {}
};

export const formatDateForCompare = (date) => {
  return new Date(date);
};

export const getErrorMessage = (msg) => {
  const { t } = getI18n();

  switch (msg) {
    case 'DEVICE_REMOVED':
      return t('deviceRemoved');
    case 'INPUT_INVALID':
      return t('inputInvalid');
    case 'POCKET_NOT_FOUND':
      return t('pocketNotFound');
    case 'INTERNAL_ERROR':
      return t('internalError');
    default:
      return msg;
  }
};
