import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'static',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    }
  },
  server: {
    port: 3000,
    open: true,
  },
});