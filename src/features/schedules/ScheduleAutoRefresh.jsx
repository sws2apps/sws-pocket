import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { apiFetchSchedule } from '../../api/schedule';
import { congAccountConnectedState } from '../../states/congregation';

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
