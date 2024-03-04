declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: string;
    APP_NAME: string;
    API_URL: string;
    ANDROID_PACKAGE_NAME: string;
    ANDROID_VERSION_NAME: string;
    ANDROID_VERSION_CODE: string;
    ANDROID_STORE_FILE: string;
    ANDROID_STORE_PASSWORD: string;
    ANDROID_KEY_ALIAS: string;
    ANDROID_KEY_PASSWORD: string;
    IOS_BUNDLE_IDENTIFIER: string;
    IOS_VERSION: string;
    IOS_BUILD: string;
    ANDROID_APP_SECRET_KEY: string;
    ANDROID_CODE_PUSH_DEPLOYMENT_KEY: string;
    IOS_APP_SECRET_KEY: string;
    IOS_CODE_PUSH_DEPLOYMENT_KEY: string;
  }

  const Config: NativeConfig;
  export default Config;
}
