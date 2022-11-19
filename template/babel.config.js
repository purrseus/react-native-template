module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@core': './src/core',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@layouts': './src/layouts',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@services': './src/services',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utilities': './src/utilities',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
