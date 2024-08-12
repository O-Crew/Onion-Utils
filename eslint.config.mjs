import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-explicit-any': ['error', 'never'],
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['./packages/**/**/*.ts'],
    rules: {
      'no-console': 'error'
    }
  }
]
