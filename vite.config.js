
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my_little_blog/',  // ← حتماً اسم ریپو را درست وارد کن
  server: {
    port: 5173
  }
});