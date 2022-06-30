import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 1234,
    proxy: {
      '/graphql': 'http://localhost:3000',
      '/maps': {
        changeOrigin: true,
        secure: true,
        target:'https://www.google.com/maps',
        rewrite: (path) => path.replace(/^\/maps/, ''),
      },

    },
  },
  plugins: [react()],
});
