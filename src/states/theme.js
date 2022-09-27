import { selector } from 'recoil';
import { isLightThemeState } from './app';

export const themeOptionsState = selector({
	key: 'themeOptions',
	get: ({ get }) => {
		const isLight = get(isLightThemeState);

		return {
			textNotImportant: isLight ? '#707B7C' : '#D0D3D4',
			navBar: '#3f51b5 !important',
			borderPrimary: isLight ? '#566573' : '#ECF0F1',
			backgroundStudent: isLight ? 'lightblue' : '#CACFD2',
		};
	},
});
