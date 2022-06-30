describe('Testing PocketSignUp Componet', () => {
	before(() => {
		cy.visit('/');

		cy.intercept('https://tls-use1.fpapi.io/').as('getVisitorID1');
		cy.intercept('https://api.fpjs.io/?ci=js/3.6.6').as('getVisitorID2');

		cy.wait(['@getVisitorID1', '@getVisitorID2']);
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
