import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importX from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const tsconfig = ['./tsconfig.eslint.json', './tsconfig.node.json']

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'import-x': importX,
      perfectionist,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: tsconfig,
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        noWarnOnMultipleProjects: true,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: { project: tsconfig },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@/state/*'], message: 'Use the "@/state" facade instead of deep imports.' },
            { group: ['@/features/*'], message: 'Use the "@/features" facade instead of deep imports.' },
            { group: ['@/shared/ui/*'], message: 'Use the "@/shared/ui" facade.' },
            { group: ['@/shared/config/*'], message: 'Use the "@/shared/config" facade.' },
            { group: ['@/shared/api/*'], message: 'Use the "@/shared/api" facade.' },
          ],
        },
      ],
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-named-imports': [
        'warn',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      semi: ['error', 'always'],
    },
  },
  {
    files: ['src/state/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/app/providers/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
])
