import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import plugin from 'rollup-plugin-dts'

const esbuildPlugin = esbuild()
const dtsPlugin = dts()

const config = [
  {
    input: './packages/core/index.ts',
    output: [
      {
        file: './packages/core/dist/index.mjs',
        format: 'esm'
      },
      {
        file: './packages/core/dist/index.cjs',
        format: 'commonjs'
      },
      { file: './packages/core/dist/index.d.ts' }
    ],
    plugins: [esbuildPlugin]
  },
  {
    input: './packages/shared/index.ts',
    output: [
      {
        file: './packages/shared/dist/index.mjs',
        format: 'esm'
      },
      {
        file: './packages/shared/dist/index.cjs',
        format: 'commonjs'
      }
    ],
    plugins: [esbuildPlugin]
  },
  {
    input: './packages/core/index.ts',
    output: { file: './packages/core/dist/index.d.ts' },
    plugins: [dtsPlugin]
  },
  {
    input: './packages/shared/index.ts',
    output: { file: './packages/shared/dist/index.d.ts' },
    plugins: [dtsPlugin]
  }
]

export default config
