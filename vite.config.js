import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
	build: {
		chunkSizeWarningLimit: 1500,
	},
	server: {
		port: 4000,
	},
	preview: {
		port: 5000,
	},
});
