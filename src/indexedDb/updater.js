import { getI18n } from 'react-i18next';
import { langList } from '../locales/langList';
import appDb from './appDb';

export const updateAssignmentType = async (step) => {
	let bReadObj = {};
	let initCallObj = {};
	let rvObj = {};
	let bsObj = {};
	let talkObj = {};
	let icVideoObj = {};
	let rvVideoObj = {};
	let otherObj = {};
	let memorialObj = {};

	langList.forEach((lang) => {
		bReadObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'bibleReading'
		];
		initCallObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'initialCall'
		];
		rvObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'returnVisit'
		];
		bsObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'bibleStudy'
		];
		talkObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'talk'
		];
		otherObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'otherPart'
		];
		icVideoObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'initialCallVideo'
		];
		rvVideoObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'returnVisitVideo'
		];
		memorialObj[lang.code] = getI18n().getDataByLanguage(lang.code).translation[
			'memorialInvite'
		];
	});

	await appDb.assignment_type.clear();

	appDb.assignment_type.bulkAdd([
		{
			code: 100,
			type_name: { ...bReadObj },
		},
		{
			code: 101,
			type_name: { ...initCallObj },
		},
		{
			code: 102,
			type_name: { ...rvObj },
		},
		{
			code: 103,
			type_name: { ...bsObj },
		},
		{
			code: 104,
			type_name: { ...talkObj },
		},
		{
			code: 105,
			type_name: { ...icVideoObj },
		},
		{
			code: 106,
			type_name: { ...rvVideoObj },
		},
		{
			code: 107,
			type_name: { ...otherObj },
		},
		{
			code: 108,
			linkTo: 101,
			type_name: { ...memorialObj },
		},
	]);
};
