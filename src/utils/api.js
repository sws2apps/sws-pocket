import { promiseGetRecoil, promiseSetRecoil } from 'recoil-outside';
import { dbUpdateAppSettings } from '../indexedDb/dbAppSettings';
import { dbUpdateSchedule } from '../indexedDb/dbSchedule';
import { isDbExist } from '../indexedDb/dbUtility';
import { classCountState } from '../states/congregation';
import {
  apiHostState,
  isOnlineState,
  rootModalOpenState,
  sourceLangState,
  userIDState,
  visitorIDState,
} from '../states/main';
import { loadApp } from './app';

const getProfile = async () => {
  const apiHost = await promiseGetRecoil(apiHostState);
  const visitorID = await promiseGetRecoil(visitorIDState);
  const userID = await promiseGetRecoil(userIDState);
  const isOnline = await promiseGetRecoil(isOnlineState);

  return { apiHost, isOnline, userID, visitorID };
};

export const apiPocketSignUp = async (code) => {
  const { apiHost, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const res = await fetch(`${apiHost}api/sws-pocket/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visitorid: visitorID, otp_code: code.toUpperCase() }),
      });

      const data = await res.json();

      return { status: res.status, data };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiPocketValidate = async () => {
  const { apiHost, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const res = await fetch(`${apiHost}api/sws-pocket/validate-me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
        },
      });

      const data = await res.json();

      return { status: res.status, data };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiFetchPocketSessions = async () => {
  const { apiHost, userID, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const res = await fetch(`${apiHost}api/sws-pocket/${userID}/devices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
        },
      });

      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiPocketDeviceDelete = async (pocket_visitorid) => {
  const { apiHost, userID, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const res = await fetch(`${apiHost}api/sws-pocket/${userID}/devices`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
        },
        body: JSON.stringify({ pocket_visitorid }),
      });

      const data = await res.json();

      return { status: res.status, data };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiFetchSchedule = async () => {
  await promiseSetRecoil(rootModalOpenState, true);

  const { apiHost, isOnline, visitorID } = await getProfile();

  if (isOnline && apiHost !== '' && visitorID !== '') {
    const res = await fetch(`${apiHost}api/sws-pocket/meeting-schedule`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        visitorid: visitorID,
      },
    });

    const { cong_schedule, cong_sourceMaterial, class_count, source_lang } = await res.json();

    const isExist = await isDbExist('sws_pocket');
    if (isExist) {
      await dbUpdateAppSettings({ class_count, source_lang });
      await dbUpdateSchedule({ cong_schedule, cong_sourceMaterial });
      await promiseSetRecoil(classCountState, class_count);
      await promiseSetRecoil(sourceLangState, source_lang);
    }
  }

  await promiseSetRecoil(rootModalOpenState, false);
};
