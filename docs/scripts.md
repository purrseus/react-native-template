# Scripts

- [setup](#setup)
- [setup:code-push](#setupcode-push)
- [android](#android)
- [ios](#ios)
- [firebase](#firebase)
- [start](#start)
- [xcode](#xcode)
- [code-push](#code-push)
- [generate](#generate)
- [lint](#lint)
- [lint:fix](#lintfix)
- [format](#format)
- [commit](#commit)
- [test](#test)
- [postinstall](#postinstall)
- [prepare](#prepare)

## setup

```sh
yarn setup
```

It will run all the necessary scripts for your project. You need to run it as soon as right after initializing the project.

## setup:code-push

```sh
yarn setup:code-push
```

It will create/update code push configuration files for your project.

## android

```sh
yarn android
```

Builds your app and starts it on a connected Android emulator or device.

## ios

```sh
yarn ios
```

Builds your app and starts it on iOS simulator.

## firebase

```sh
yarn firebase
```

It will select the firebase config file that matches the environment you choose.

## start

```sh
yarn start
```

Starts the server that communicates with connected devices.

## xcode

```sh
yarn xcode
```

It will open the `xcworkspace` in XCode.

## code-push

```sh
yarn code-push
```

It will release the update to the CodePush server.

## generate

```sh
yarn generate [folder_name] [target_dir]
```

It will create a template folder with name is `folder_name` in the `target_dir`. By default, `target_dir` is `src/features`.

## lint

```sh
yarn lint
```

It will find problems in your project.

## lint:fix

```sh
yarn lint:fix
```

It will find and fix problems in your project.

## format

```sh
yarn format
```

It will format all files supported by Prettier in your project.

## commit

```sh
yarn commit
```

It will create the prompts needed to start a commit.

## test

```sh
yarn test
```

It will run all of the test cases.

## postinstall

These are the set of tasks which will run after every dependency installation. These tasks are:

- It will run all of the patches defined in the patches directory. You can find the list of the patched dependencies [here](../template/patches).

- Update react-native-permissions podspec to link additional permission handlers.

- If you are running the project on MacOS, the it will automatically install the pods in the ios directory. If you are not on a MacOS machine, then it will skip the installing the pods.

## prepare

It will automatically have Git hooks enabled after install.
