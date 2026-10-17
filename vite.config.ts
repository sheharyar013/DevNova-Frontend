import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Contact form backend: run `npm run dev:api` alongside `npm run dev`
    proxy: { '/api': 'http://localhost:8000' },
  },
})
