import { rollup } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  alias: {
    '@onion/core': './packages/core/index.ts',
    '@onion/core/*': './packages/core/*',
    '@onion/core/shared': './packages/core/shared/index.ts'
  },
  plugins: [typescript()]
}
