import preact from '@preact/preset-vite';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
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
        format: 'umd',
        dir: 'dist',
        entryFileNames: 'benefits-onboarding.js'
      }
    }
  }
});
