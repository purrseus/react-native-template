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
          '@navigators': './src/navigators',
          '@providers': './src/providers',
          '@services': './src/services',
          '@stores': './src/stores',
          '@themes': './src/themes',
          '@utilities': './src/utilities',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
