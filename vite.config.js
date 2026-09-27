import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Same alias as the official site, so both projects read alike.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})