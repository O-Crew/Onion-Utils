import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@onion/core': resolve(__dirname, '../../packages/core/dist'),
      '@onion/shared': resolve(__dirname, '../../packages/shared/dist')
    }
  }
})
