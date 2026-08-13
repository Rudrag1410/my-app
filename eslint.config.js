// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Prefer arrow functions everywhere - components, hooks, and plain utilities.
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Keep files/functions from growing into a pile of unrelated return paths -
      // once a function trips these, it's a signal to extract a component or helper.
      complexity: ['warn', 10],
      'max-depth': ['warn', 3],
      'max-lines-per-function': [
        'warn',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      'max-lines': [
        'warn',
        { max: 250, skipBlankLines: true, skipComments: true },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-nested-ternary': 'error',
    },
  },

  // Must stay last - disables stylistic rules that would fight Prettier.
  prettierConfig,

  {
    ignores: ['dist/*'],
  },
]);
