import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import loadVersion from 'vite-plugin-package-version';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint(), loadVersion()],
	build: {
		chunkSizeWarningLimit: 1500,
	},
	server: {
		port: 4000,
	},
	preview: {
		port: 4000,
	},
});
