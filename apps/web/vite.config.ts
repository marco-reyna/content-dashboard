import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content-dashboard/shared': path.resolve(
        __dirname,
        '../../packages/shared/src',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});