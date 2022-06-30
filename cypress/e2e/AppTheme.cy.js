describe('Testing AppTheme Component', () => {
	before(() => {
		cy.visit('/');
	});

	it('Can toggle between light and dark mode', () => {
		cy.get('[data-testid=app-theme-switcher]').click();
		cy.get('[data-testid=app-dark-icon]').should('be.visible');
		cy.wait(3000);
		cy.get('[data-testid=app-theme-switcher]').click();
		cy.get('[data-testid=app-light-icon]').should('be.visible');
	});
});
