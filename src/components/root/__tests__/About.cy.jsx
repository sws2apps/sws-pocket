import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { isAboutOpenState } from '../../../states/app';
import About from '../About';

const SetOpen = () => {
	const setIsAboutOpenState = useSetRecoilState(isAboutOpenState);

	useEffect(() => {
		setIsAboutOpenState(true);
	}, [setIsAboutOpenState]);

	return <About />;
};

const SetClose = () => {
	const setIsAboutOpenState = useSetRecoilState(isAboutOpenState);

	useEffect(() => {
		setIsAboutOpenState(true);
		setTimeout(() => {
			setIsAboutOpenState(false);
		}, [1500]);
	}, [setIsAboutOpenState]);

	return <About />;
};

const AboutDisplay = () => (
	<RecoilRoot>
		<SetOpen />
	</RecoilRoot>
);

const AboutHide = () => (
	<RecoilRoot>
		<SetClose />
	</RecoilRoot>
);

describe('Testing About Component', () => {
	context('it mounts', () => {
		beforeEach(() => {
			cy.mount(<AboutDisplay />);
		});

		it('display as modal', () => {
			cy.get('[data-testid=modal-about]').should('exist');
		});

		it('application version is displayd', () => {
			cy.get('[data-testid=app-version]').should(
				'have.text',
				import.meta.env.PACKAGE_VERSION
			);
		});

		it('current year displayed as copyright', () => {
			cy.get('[data-testid=copyright-year]').should(
				'include.text',
				new Date().getFullYear()
			);
		});
	});

	it('will hide when state changed', () => {
		cy.mount(<AboutHide />);
		cy.get('[data-testid=modal-about]').should('not.exist');
	});
});
