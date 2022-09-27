import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationE from './locales/E.json';
import translationMG from './locales/MG.json';

const resources = {
	E: {
		translation: translationE,
	},
	MG: {
		translation: translationMG,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'E',
	fallbackLng: 'E',

	keySeparator: true,

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
