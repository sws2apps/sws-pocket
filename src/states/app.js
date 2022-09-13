import { atom } from 'recoil';

export const isSetupState = atom({
	key: 'isSetup',
	default: false,
});

export const startupProgressState = atom({
	key: 'startupProgress',
	default: 0,
});

export const isAppLoadState = atom({
	key: 'isAppLoad',
	default: true,
});

export const isPrecachedState = atom({
	key: 'isPrecached',
	default: false,
});

export const showReloadState = atom({
	key: 'showReload',
	default: false,
});

export const isOnlineState = atom({
	key: 'isOnline',
	default: window.navigator.onLine,
});

export const visitorIDState = atom({
	key: 'visitorID',
	default: '',
});

export const isLightThemeState = atom({
	key: 'isLightTheme',
	default: localStorage.getItem('theme') === 'dark' ? false : true || true,
});

export const apiHostState = atom({
	key: 'apiHost',
	default: '',
});

export const appStageState = atom({
	key: 'appStage',
	default: '',
});

export const isAboutOpenState = atom({
	key: 'isAboutOpen',
	default: false,
});

export const isRefreshScheduleOpenState = atom({
	key: 'isRefreshScheduleOpen',
	default: false,
});

export const startRefreshScheduleState = atom({
	key: 'startRefreshSchedule',
	default: false,
});
