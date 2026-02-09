import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // automatic test params
  test: {
    environment: 'jsdom',
    globals: true
  }
})
