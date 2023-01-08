import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { congAccountConnectedState } from '../../states/congregation';
import { apiFetchSchedule } from '../../utils/api';

const ScheduleAutoRefresh = () => {
  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  useEffect(() => {
    if (congAccountConnected) {
      apiFetchSchedule();
    }
  }, [congAccountConnected]);

  return <></>;
};

export default ScheduleAutoRefresh;
