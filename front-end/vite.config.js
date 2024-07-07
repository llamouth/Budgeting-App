import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      generateBundle() {
        const src = resolve(__dirname, '_redirects');
        const dest = resolve(__dirname, 'dist', '_redirects');
        copyFileSync(src, dest);
      },
    },
  ],
  build: {
    outDir: 'dist',
  },
});
