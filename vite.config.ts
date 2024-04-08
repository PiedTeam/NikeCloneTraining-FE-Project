import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@apis': '/src/apis',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@layout': '/src/layout',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@utils': '/src/utils'
    }
  }
})
