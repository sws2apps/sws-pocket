import { atom, selector } from 'recoil';

export const congNameState = atom({
  key: 'congName',
  default: '',
});

export const congNumberState = atom({
  key: 'congNumber',
  default: '',
});

export const congIDState = atom({
  key: 'congID',
  default: '',
});

export const meetingDayState = atom({
  key: 'meetingDay',
  default: 3,
});

export const classCountState = atom({
  key: 'classCount',
  default: 1,
});

export const meetingTimeState = atom({
  key: 'meetingTime',
  default: new Date(Date.now()),
});

export const usernameState = atom({
  key: 'username',
  default: '',
});

export const congInfoFormattedState = selector({
  key: 'congInforFormattedState',
  get: ({ get }) => {
    const congName = get(congNameState);
    const congNumber = get(congNumberState);

    let formatted = '';
    if (congName !== '' && congNumber !== '') {
      formatted = `${congName} (${congNumber})`;
    }

    return formatted;
  },
});

export const congAccountConnectedState = atom({
  key: 'congAccountConnected',
  default: false,
});

export const pocketLocalIDState = atom({
  key: 'pocketLocalID',
  default: '',
});

export const pocketMembersState = atom({
  key: 'pocketMembers',
  default: [],
});

export const isAdminCongState = atom({
  key: 'isAdminCong',
  default: false,
});
