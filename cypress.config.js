const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: 'xvw6ii',
	video: false,

	e2e: {
		baseUrl: 'http://localhost:4080',
		requestTimeout: 50000,
	},

	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});
