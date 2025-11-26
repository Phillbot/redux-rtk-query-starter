import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';

const srcPath = fileURLToPath(new URL('./src', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts({
      enabledMode: ['development', 'production'],
      sourceDir: srcPath,
      outputDir: path.resolve(srcPath, '__generated__/styles'),
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom', 'nuqs'],
          i18n: ['i18next', 'react-i18next'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    css: true,
  },
});
