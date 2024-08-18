import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // ... other config options ...
  resolve: {
    alias: {
      '@onion/shared': resolve(__dirname, './packages/shared/index.ts')
    }
  }
})
