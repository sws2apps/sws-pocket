import { promiseGetRecoil, promiseSetRecoil } from 'recoil-outside';
import { getI18n } from 'react-i18next';
import { format } from 'date-fns';
import { initAppDb } from '../indexedDb/dbUtility';
import { appLangState, sourceLangState } from '../states/main';
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
import { scheduleDataState, scheduleLocalState, sourceDataState } from '../states/schedule';
import { LANGUAGE_LIST } from '../locales/langList';

export const loadApp = async () => {
  try {
    const I18n = getI18n();

    await initAppDb();

    // validate lang
    const tempLang = localStorage.getItem('app_lang') || 'e';
    const app_lang = LANGUAGE_LIST.find((lang) => lang.code === tempLang)?.code || 'e';
    localStorage.setItem('app_lang', app_lang);

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
  } catch (err) {
    console.log(err);
  }
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

export const getAssignmentName = (assType) => {
  const { t } = getI18n();

  if (assType === 101 || (assType >= 140 && assType < 170)) {
    return t('initialCall', { ns: 'ui' });
  }

  if (assType === 102 || (assType >= 170 && assType < 200)) {
    return t('returnVisit', { ns: 'ui' });
  }

  if (assType === 103) {
    return t('bibleStudy', { ns: 'ui' });
  }

  if (assType === 104) {
    return t('talk', { ns: 'ui' });
  }

  if (assType === 108) {
    return t('memorialInvite', { ns: 'ui' });
  }
};

export const getCurrentWeekDate = async () => {
  const schedules = await promiseGetRecoil(scheduleLocalState);
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  let monDay = new Date(today.setDate(diff));

  let currentWeek = format(monDay, 'MM/dd/yyyy');
  let isExist = false;

  if (schedules.length > 0) {
    do {
      const fDate = format(monDay, 'MM/dd/yyyy');
      const schedule = schedules.find((data) => data.weekOf === fDate);
      if (schedule) {
        currentWeek = fDate;
        isExist = true;
      }
      monDay.setDate(monDay.getDate() + 7);
    } while (isExist === false);
  }

  return currentWeek;
};
