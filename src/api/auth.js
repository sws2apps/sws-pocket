import { getProfile } from './common';

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
