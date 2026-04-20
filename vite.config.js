import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: '5173'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@chakra-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react') || id.includes('react-icons') || id.includes('@fortawesome')) {
              return 'vendor-icons';
            }
            if (id.includes('axios') || id.includes('socket.io-client')) {
              return 'vendor-network';
            }
            if (id.includes('react-redux') || id.includes('@reduxjs/toolkit')) {
              return 'vendor-store';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
