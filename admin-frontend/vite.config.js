import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4102',
      '/users': 'http://localhost:4102',
      '/products': 'http://localhost:4102'
    }
  }
})
