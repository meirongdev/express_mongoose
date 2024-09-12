import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  eslintConfigPrettier,
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  {
    files: ['**/*.{js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]
