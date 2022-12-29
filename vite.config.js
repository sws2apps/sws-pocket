import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { loadVersion } from '@sws2apps/vite-plugin-package-version';

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': process.env,
	},
	plugins: [react(), eslint({ include: '/.(jsx|js)$/' }), loadVersion()],
	build: {
		chunkSizeWarningLimit: 1500,
	},
	server: {
		port: 4080,
		host: true,
	},
	preview: {
		port: 4080,
	},
});
