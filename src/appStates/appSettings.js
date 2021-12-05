import { atom } from "recoil";

export const settingsState = atom({
    key: 'appSettings',
    default: {},
})

export const isAppLoadState = atom({
    key: 'isAppLoad',
    default: true,
})

export const apiHostState = atom({
    key: 'apiHost',
    default: '',
})

export const appVersionState = atom({
    key: 'appVersion',
    default: '1.0.15',
})
