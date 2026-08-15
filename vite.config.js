import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite + React config. Vitest uses the `test` block for unit tests.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false,
  },
});
