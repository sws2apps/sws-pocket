describe('Testing PocketSignUp Componet', () => {
	before(() => {
		cy.visit('/');

		cy.intercept('GET', '**/api/sws-pocket/validate-me', {
			statusCode: 403,
			body: {
				message: 'SETUP_FIRST',
			},
		}).as('validateUser');

		cy.wait('@validateUser');
	});

	it('Focused verification code input field on load', () => {
		cy.focused().should('have.id', 'txt-verification-code');
	});

	it('Verification code field accepts input', () => {
		const txt = 'ABCDEFGHIJ';
		cy.get('#txt-verification-code').type(txt).should('have.value', txt);
	});

	it('Verification code field uppercase inputs', () => {
		const txt = 'ABCDEFGHIJ';
		cy.get('#txt-verification-code')
			.clear()
			.type(txt.toLowerCase())
			.should('have.value', txt);
	});

	it('Sign in button should be enabled', () => {
		cy.get('[data-testid=btn-sign-in]').should('not.be.disabled');
	});
});
