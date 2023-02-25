import { atom } from 'recoil';

export const isLightThemeState = atom({
  key: 'isLightTheme',
  default: localStorage.getItem('theme') ? (localStorage.getItem('theme') === 'dark' ? false : true) : true,
});

export const appLangState = atom({
  key: 'appLang',
  default: localStorage.getItem('app_lang') || 'e',
});

export const isPrecachedState = atom({
  key: 'isPrecached',
  default: false,
});

export const showReloadState = atom({
  key: 'showReload',
  default: false,
});
