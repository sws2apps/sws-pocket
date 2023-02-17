import { promiseSetRecoil } from 'recoil-outside';
import { getProfile } from './common';
import { isFetchingScheduleState, rootModalOpenState, sourceLangState } from '../states/main';
import { isDbExist } from '../indexedDb/dbUtility';
import { dbUpdateSchedule } from '../indexedDb/dbSchedule';
import { classCountState } from '../states/congregation';
import { dbUpdateAppSettings } from '../indexedDb/dbAppSettings';

export const apiFetchSchedule = async () => {
  await promiseSetRecoil(rootModalOpenState, true);

  const { apiHost, isOnline, visitorID } = await getProfile();

  if (isOnline && apiHost !== '' && visitorID !== '') {
    await promiseSetRecoil(isFetchingScheduleState, true);
    const res = await fetch(`${apiHost}api/sws-pocket/meeting-schedule`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        visitorid: visitorID,
      },
    });

    const { cong_schedule, cong_sourceMaterial, class_count, source_lang, co_name, co_displayName } = await res.json();

    const isExist = await isDbExist('sws_pocket');
    if (isExist) {
      await dbUpdateSchedule({ cong_schedule, cong_sourceMaterial });
      await promiseSetRecoil(classCountState, class_count);
      await promiseSetRecoil(sourceLangState, source_lang);

      await dbUpdateAppSettings({ class_count, source_lang, co_name, co_displayName });
    }

    await promiseSetRecoil(isFetchingScheduleState, false);
  }

  await promiseSetRecoil(rootModalOpenState, false);
};
