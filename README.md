# :seedling: React Native Template

[![Current lint status.][lint-badge]][lint]
[![Current publish package status.][publish-badge]][publish]
[![Current npm package version.][npm-badge]][npm]
[![Documentation][documentation-badge]][documentation]
[![License][license-badge]][license]

> Clean, efficient and scalable React Native template with pre-configured common set of packages to quick-start a new app.

## :bookmark: Table Of Contents

- [Key Features](#star2-key-features)
- [Requirements](#grey_exclamation-requirements)
- [Usage](#zap-usage)
- [Setup](#gear-setup)
- [Troubleshooting](#hammer_and_wrench-troubleshooting)
- [Project Structure](#deciduous_tree-project-structure)
- [Scripts](#page_with_curl-scripts)
- [License](#page_facing_up-license)

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

Make sure that you have followed the environment setup instructions properly from the official [React Native docs](https://reactnative.dev/docs/environment-setup).

## :zap: Usage

```sh
npx react-native init MyApp --template @purrseus/react-native-template
```

## :gear: Setup

Run setup command:

```sh
yarn setup
```

### CodePush Setup:

_If you don't use CodePush, you can skip this setup guide._

1. Open up `scripts/utils.mjs`, replace `APP_CENTER_OWNER_NAME` value with your owner name, and replace `appCenterAppName` values with your app names.

2. Add **App Secret Key** and **Code Push Deployment Key** into AppCenter variables in your `environments/.env.*` files.

3. Run this command to create AppCenter config file for both platform directories:

```sh
yarn setup:code-push
```

### Android Setup:

1. Go to `android/app`, generate a keystore file:

```sh
sudo keytool -genkey -v -keystore development.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
# replace development for your environment, and replace my-key-alias for your alias
```

> **Warning**
> If you build android app in a specific environment without corresponding keystore, you will get a error that you are missing a keystore.

2. In `environments/.env.*` files, edit `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS` and `ANDROID_KEY_PASSWORD` values to your selected values in the keystore file.

### iOS Setup:

No additional steps are necessary.

## :hammer_and_wrench: Troubleshooting

_Once again, make sure that you have followed the environment setup instructions properly from the official docs._

### Problems with Ruby versions

This error seems to originate from the CLI, it has problems comparing between the global Ruby version on your local machine and the Ruby version requested in the [Gemfile](./template/Gemfile) file. To fix this error, try to reinstall the dependencies following the steps below:

1. `cd <project-name>` to navigate to your RN project.
2. `bundle install` to install Bundler
3. `cd ios && bundle exec pod install` to install the iOS dependencies.

## :deciduous_tree: Project Structure

See [Project Structure](./docs/project-structure.md).

## :page_with_curl: Scripts

See [Available Scripts](./docs/scripts.md).

## :page_facing_up: License

This project is [MIT](./LICENSE) licensed.

<!-- badge -->

[lint]: https://github.com/thiendo261/react-native-template/actions/workflows/lint.yml
[lint-badge]: https://github.com/thiendo261/react-native-template/actions/workflows/lint.yml/badge.svg

[publish]: https://github.com/thiendo261/react-native-template/actions/workflows/npm-publish.yml
[publish-badge]: https://github.com/thiendo261/react-native-template/actions/workflows/npm-publish.yml/badge.svg

[npm]: https://www.npmjs.com/package/@purrseus/react-native-template
[npm-badge]: https://img.shields.io/npm/v/@purrseus/react-native-template.svg?logo=npm

[documentation]: https://github.com/thiendo261/react-native-template#readme
[documentation-badge]: https://img.shields.io/badge/documentation-yes-brightgreen.svg

[license]: https://github.com/thiendo261/react-native-template/blob/HEAD/LICENSE
[license-badge]: https://img.shields.io/github/license/thiendo261/react-native-template.svg