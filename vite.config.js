import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'expo-av': path.resolve(__dirname, 'src/utils/expo-av.js'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
