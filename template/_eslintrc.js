module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-explicit-any': 'error',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-alert': 'error',
        'no-console': 'error',
        'no-var': 'error',
        'no-duplicate-imports': 'error',
        'max-lines': ['error', { skipBlankLines: true, skipComments: true, max: 500 }],
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-single-element-style-arrays': 'warn',
      },
    },
  ],
};
