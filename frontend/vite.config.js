import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Raise warning threshold — our chunks are intentionally 500-600KB for full pages
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core in its own chunk — cached separately and never changes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Axios in its own chunk
          'axios': ['axios'],
        },
      },
    },
    // Enable minification (default in prod, explicit for clarity)
    minify: 'esbuild',
    // Target modern browsers — smaller, faster output
    target: 'es2020',
    // Generate source maps only in dev, not prod (reduces deploy size)
    sourcemap: false,
  },
})
