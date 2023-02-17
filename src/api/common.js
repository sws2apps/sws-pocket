import { promiseGetRecoil } from 'recoil-outside';
import { apiHostState, isOnlineState, userIDState, visitorIDState } from '../states/main';

export const getProfile = async () => {
  const apiHost = await promiseGetRecoil(apiHostState);
  const visitorID = await promiseGetRecoil(visitorIDState);
  const userID = await promiseGetRecoil(userIDState);
  const isOnline = await promiseGetRecoil(isOnlineState);

  return { apiHost, isOnline, userID, visitorID };
};
