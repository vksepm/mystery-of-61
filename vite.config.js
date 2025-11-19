import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mystery-of-61/',
  server: {
    port: 3000,
    open: true
  }
})
