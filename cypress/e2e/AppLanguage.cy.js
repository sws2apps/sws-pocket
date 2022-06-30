describe('Testing AppLanguage Component', () => {
	describe('With larger device in width', () => {
		before(() => {
			cy.visit('/');
		});

		it('Tooltip text for language switcher should not exist', () => {
			cy.get('[data-testid=app-language-dropdown]').trigger('mouseover');
			cy.get('[data-testid=app-language-tooltip]').should('not.exist');
		});

		it('Can click language switcher', () => {
			cy.get('[data-testid=app-language-dropdown]').click();
			cy.get('[data-testid=app-language-menus]').should('be.visible');
		});

		it('Can change language', () => {
			cy.get('[data-testid=app-root-language-E]').should('exist');
			cy.get('[data-testid=app-language-MG]').click();
			cy.get('[data-testid=app-root-language-E]').should('not.exist');
			cy.get('[data-testid=app-root-language-MG]').should('exist');
		});
	});

	describe('With smaller device in width', () => {
		before(() => {
			cy.visit('/');
		});

		beforeEach(() => {
			cy.viewport(450, 625);
		});

		it('Should hide the language text', () => {
			cy.get('[data-testid=app-language-dropdownText]').should('not.exist');
		});

		it('Tooltip text for language switcher should exist', () => {
			cy.get('[data-testid=app-language-dropdown]').trigger('mouseover');
			cy.get('.MuiTooltip-popper').should('exist');
		});
	});
});
