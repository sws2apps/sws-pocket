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

export const appLangState = atom({
	key: 'appLang',
	default: 'E',
});

export const isOnlineState = atom({
	key: 'isOnline',
	default: false,
});

export const visitorIDState = atom({
	key: 'visitorID',
	default: '',
});

export const isLightThemeState = atom({
	key: 'isLightTheme',
	default: true,
});
