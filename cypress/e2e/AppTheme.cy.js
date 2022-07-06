describe('Testing AppTheme Component', () => {
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

	it('Can toggle between light and dark mode', () => {
		cy.get('[data-testid=app-theme-switcher]').click();
		cy.get('[data-testid=app-dark-icon]').should('be.visible');
		cy.wait(3000);
		cy.get('[data-testid=app-theme-switcher]').click();
		cy.get('[data-testid=app-light-icon]').should('be.visible');
	});
});
