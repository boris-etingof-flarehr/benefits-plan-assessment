import preact from '@preact/preset-vite';
import path, { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/benefits-plan': {
        target: 'https://autodev-partner.flarehr.com/benefits-plan/workplace-backend',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/benefits-plan/, '')
      }
    },
    port: 8090
  },
  plugins: [
    preact(),
    svgr({
      include: '**/*.svg'
    })
  ],
  resolve: {
    alias: [{ find: '@app', replacement: path.resolve(__dirname, './src') }]
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      output: {
        dir: 'dist',
        entryFileNames: 'benefits-plan-assessment.js'
      }
    }
  }
});

import { defineConfig } from 'vite';
