# :seedling: React Native Template

> Clean, efficient and scalable React Native template with pre-configured common set of packages to quick-start a new app.

## :bookmark: Table Of Contents

- [Key Features](#🌟-key-features)
- [Requirements](#❕-requirements)
- [Quick Start](#⚡-quick-start)
- [Setup](#⚙️-setup)
- [Project Structure](#🌳-project-structure)
- [Scripts](#📃-scripts)
- [License](#📄-license)

## :star2: Key Features

- Using [Typescript](https://www.typescriptlang.org)
- Folder-by-feature structure
- Lots of built-in components
- Minimal additional dependencies
- Dark mode support
- Lint commit messages using [Commitlint](https://github.com/conventional-changelog/commitlint)
- Multiple environment configurations using [React Native Config](https://github.com/luggit/react-native-config)
- State management using [Redux Toolkit](https://redux-toolkit.js.org)
- Local storage using [MMKV](https://github.com/mrousavy/react-native-mmkv)
- Routing and navigation using [React Navigation](https://reactnavigation.org/)
- API requests using [Axios](https://axios-http.com)
- Debug tool using [Flipper](https://fbflipper.com)

## :grey_exclamation: Requirements

1. You should use macOS because building and running iOS apps is limited to macOS.

2. Make sure that you have followed the environment setup instructions properly from the official [React Native docs](https://reactnative.dev/docs/environment-setup).

## :zap: Quick Start

```sh
$ npx react-native init MyApp --template https://github.com/thiendo261/react-native-template
```

_:grey_exclamation: NOTE: If you having trouble with **iOS**, go to your project directory and try to reinstall the dependencies by running:_

```sh
$ bundle install
cd ios && bundle exec pod install
```

## :gear: Setup

Run setup command:

```sh
$ npm run setup
# --- or ---
$ yarn setup
```

### CodePush Setup:

_If you not using CodePush, you can ignore this part._

1. In `scripts/utils.mjs`, replace `APP_CENTER_OWNER_NAME` value with your owner name, and replace `appCenterAppName` values with your app names.

2. Add **App Secret Key** and **Code Push Deployment Key** into **AppCenter** variables in your `environments/.env.*` files.

3. Run this command to create **AppCenter config file** for both platform directories:

```sh
$ npm run setup codepush
# --- or ---
$ yarn setup codepush
```

### Android Setup:

1. In `android/app`, generate a keystore file:

```sh
$ sudo keytool -genkey -v -keystore development.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 # replace development for your environment
```

**_:warning: WARNING: If you build a specific environment android app without corresponding keystore, you will get a keystore missing error!_**

2. In `environments/.env.*` files, edit `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS` and `ANDROID_KEY_PASSWORD` values to your selected values in the keystore file.

### iOS Setup:

No additional steps are necessary.

## :deciduous_tree: Project Structure

See [Project Structure](./docs/project-structure.md).

## :page_with_curl: Scripts

See [Available Scripts](./docs/scripts.md).

## :page_facing_up: License

This project is [MIT](./LICENSE) licensed.
