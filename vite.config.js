import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { loadVersion } from '@sws2apps/vite-plugin-package-version';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), loadVersion()],
  server: {
    port: 4080,
    host: true,
  },
  preview: {
    port: 4080,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    target: 'esnext',
  },
});
