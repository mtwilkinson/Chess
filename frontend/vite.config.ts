import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  build: {
    outDir: "../builds/frontend-dist",
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
})
