// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'] // Separate chunk for vendor libraries
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000 kB
  },
  root: './', // Ensure this points to the root of your project
  publicDir: './public' // Path to your public directory containing index.html
});
