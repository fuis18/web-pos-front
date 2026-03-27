import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

//  tseslint.configs.recommendedTypeChecked,
//  tseslint.configs.strictTypeChecked,
//  tseslint.configs.stylisticTypeChecked,

// languageOptions: {
//       // parserOptions: {
//       //   project: ['./tsconfig.node.json', './tsconfig.app.json'],
//       //   tsconfigRootDir: import.meta.dirname,
//       // },
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
