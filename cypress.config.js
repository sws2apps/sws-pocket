const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: 'xvw6ii',
	video: false,
	e2e: {
		baseUrl: 'http://localhost:5000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
