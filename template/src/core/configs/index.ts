import Config from 'react-native-config';

type NestedRequired<T> = {
  [P in keyof T]-?: T[P] extends string | undefined ? string : NestedRequired<T[P]>;
};

const nativeConfig = {
  env: Config.ENV,
  appName: Config.APP_NAME,
  apiUrl: Config.API_URL,
  android: {
    packageName: Config.ANDROID_PACKAGE_NAME,
    versionName: Config.ANDROID_VERSION_NAME,
    versionCode: Config.ANDROID_VERSION_CODE,
    storeFile: Config.ANDROID_STORE_FILE,
    storePassword: Config.ANDROID_STORE_PASSWORD,
    keyAlias: Config.ANDROID_KEY_ALIAS,
    keyPassword: Config.ANDROID_KEY_PASSWORD,
  },
  ios: {
    bundleIdentifier: Config.IOS_BUNDLE_IDENTIFIER,
    version: Config.IOS_VERSION,
    build: Config.IOS_BUILD,
  },
  codePush: {
    android: {
      appSecretKey: Config.ANDROID_APP_SECRET_KEY,
      codePushDevelopmentKey: Config.ANDROID_CODE_PUSH_DEPLOYMENT_KEY,
    },
    ios: {
      appSecretKey: Config.IOS_APP_SECRET_KEY,
      codePushDevelopmentKey: Config.IOS_CODE_PUSH_DEPLOYMENT_KEY,
    },
  },
};

const config = nativeConfig as NestedRequired<typeof nativeConfig>;
export default config;
