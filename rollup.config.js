import typescript from '@rollup/plugin-typescript'

export default {
  input: './packages/core/index.ts',
  output: [
    {
      file: './packages/core/dist/index.mjs',
      format: 'esm'
    },
    {
      file: './packages/core/dist/index.cjs',
      format: 'cjs'
    }
  ],
  plugins: [typescript()]
}
