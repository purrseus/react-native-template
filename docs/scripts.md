# Scripts

- [setup](#setup)
- [android](#android)
- [ios](#ios)
- [start](#start)
- [xcode](#xcode)
- [code-push](#code-push)
- [generate](#generate)
- [lint](#lint)
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

- If you are running the project on MacOS, the it will automatically install the pods in the ios directory. If you are not on a MacOS machine, then it will skip the installing the pods.

## prepare

It will automatically have Git hooks enabled after install.
