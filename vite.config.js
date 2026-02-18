import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tinyurl.com', // Changed only the target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api-create.php') // Adjusted for TinyURL GET
      }
    }
  }
})