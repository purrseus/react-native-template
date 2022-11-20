module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/jsx-runtime', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-duplicate-imports': 'error',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-explicit-any': 'error',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-alert': 'error',
        'no-console': 'error',
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-single-element-style-arrays': 'warn',
      },
    },
  ],
};
