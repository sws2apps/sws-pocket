const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: 'xvw6ii',
	video: false,

	e2e: {
		baseUrl: 'http://localhost:4000',
		requestTimeout: 50000,
	},
});
