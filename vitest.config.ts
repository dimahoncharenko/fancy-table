/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul'
    },
    css: true,
    setupFiles: 'src/config/testSetup.ts'
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  }
})
