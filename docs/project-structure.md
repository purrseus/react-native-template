# Project Structure

```
.
├── .buckconfig
├── .bundle
│   └── config
├── .czrc
├── .env
├── .eslintrc.js
├── .gitignore
├── .husky
│   ├── _/
│   ├── .gitignore
│   ├── commit-msg
│   └── pre-commit
├── .node-version
├── .prettierrc.js
├── .ruby-version
├── .watchmanconfig
├── Gemfile
├── Gemfile.lock
├── README.md
├── __tests__
│   └── App-test.tsx
├── android/
├── app.json
├── babel.config.js
├── commitlint.config.js
├── environments
│   ├── .env.development
│   ├── .env.production
│   └── .env.staging
├── index.js
├── ios/
├── lint-staged.config.js
├── metro.config.js
├── node_modules/
├── package.json
├── patches
│   └── react-native+0.70.3.patch
├── react-native.config.js
├── scripts
│   ├── android.mjs
│   ├── code-push.mjs
│   ├── generate.mjs
│   ├── ios.mjs
│   ├── setup.mjs
│   └── utils.mjs
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── animations
│   │   │   └── .gitkeep
│   │   ├── icons
│   │   │   ├── checkbox
│   │   │   │   ├── tick.png
│   │   │   │   ├── tick@2x.png
│   │   │   │   └── tick@3x.png
│   │   │   ├── header
│   │   │   │   ├── back.png
│   │   │   │   ├── back@2x.png
│   │   │   │   ├── back@3x.png
│   │   │   │   ├── more-action.png
│   │   │   │   ├── more-action@2x.png
│   │   │   │   └── more-action@3x.png
│   │   │   └── tabs
│   │   │       ├── home
│   │   │       │   ├── home-focused.png
│   │   │       │   ├── home-focused@2x.png
│   │   │       │   ├── home-focused@3x.png
│   │   │       │   ├── home.png
│   │   │       │   ├── home@2x.png
│   │   │       │   └── home@3x.png
│   │   │       ├── messages
│   │   │       │   ├── message-focused.png
│   │   │       │   ├── message-focused@2x.png
│   │   │       │   ├── message-focused@3x.png
│   │   │       │   ├── message.png
│   │   │       │   ├── message@2x.png
│   │   │       │   └── message@3x.png
│   │   │       ├── notification
│   │   │       │   ├── notification-focused.png
│   │   │       │   ├── notification-focused@2x.png
│   │   │       │   ├── notification-focused@3x.png
│   │   │       │   ├── notification.png
│   │   │       │   ├── notification@2x.png
│   │   │       │   └── notification@3x.png
│   │   │       └── profile
│   │   │           ├── profile-focused.png
│   │   │           ├── profile-focused@2x.png
│   │   │           ├── profile-focused@3x.png
│   │   │           ├── profile.png
│   │   │           ├── profile@2x.png
│   │   │           └── profile@3x.png
│   │   ├── images
│   │   │   └── .gitkeep
│   │   └── index.ts
│   ├── components
│   │   ├── core
│   │   │   ├── BottomSheet
│   │   │   │   ├── ActionSheet.tsx
│   │   │   │   └── BottomSheet.tsx
│   │   │   ├── Form
│   │   │   │   ├── Checkboxes.tsx
│   │   │   │   ├── Field.tsx
│   │   │   │   └── TextInput.tsx
│   │   │   ├── Image
│   │   │   │   ├── Icon.tsx
│   │   │   │   └── Image.tsx
│   │   │   ├── Layout
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── Row.tsx
│   │   │   │   └── StatusBar.tsx
│   │   │   ├── List
│   │   │   │   ├── InfiniteList.tsx
│   │   │   │   ├── KeyboardAwareScrollView.tsx
│   │   │   │   └── List.tsx
│   │   │   ├── Loader
│   │   │   │   ├── ActivityIndicator.tsx
│   │   │   │   ├── OverlayLoading.tsx
│   │   │   │   └── RefreshControl.tsx
│   │   │   ├── Modal
│   │   │   │   ├── Alert.ts
│   │   │   │   └── Modal.tsx
│   │   │   ├── Picker
│   │   │   │   ├── DateTimePicker.tsx
│   │   │   │   └── ImagePicker.tsx
│   │   │   ├── Pressable
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   ├── PressArea.tsx
│   │   │   │   └── Switch.tsx
│   │   │   ├── Spacer
│   │   │   │   ├── BottomSpacer.tsx
│   │   │   │   └── Spacer.tsx
│   │   │   ├── Text
│   │   │   │   ├── Input
│   │   │   │   │   ├── Multiline
│   │   │   │   │   │   └── MultilineTextInput.tsx
│   │   │   │   │   └── Singleline
│   │   │   │   │       ├── IconTextInput.tsx
│   │   │   │   │       └── TextInput.tsx
│   │   │   │   └── Text.tsx
│   │   │   └── index.ts
│   │   └── custom
│   │       ├── NavigationHeader.tsx
│   │       ├── StackContainer.tsx
│   │       └── index.ts
│   ├── core
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── data
│   │   │   └── .gitkeep
│   │   ├── declare
│   │   │   ├── array.ts
│   │   │   ├── declarations.d.ts
│   │   │   ├── index.ts
│   │   │   ├── object.ts
│   │   │   └── string.ts
│   │   ├── enums
│   │   │   ├── index.ts
│   │   │   └── navigation.ts
│   │   ├── index.d.ts
│   │   ├── interfaces
│   │   │   ├── common.ts
│   │   │   ├── component.ts
│   │   │   ├── hook.ts
│   │   │   ├── index.ts
│   │   │   └── service.ts
│   │   └── types
│   │       ├── common.ts
│   │       ├── i18n.ts
│   │       ├── index.ts
│   │       ├── navigation.ts
│   │       ├── screen.ts
│   │       ├── service.ts
│   │       └── store.ts
│   ├── features
│   │   ├── authentication
│   │   │   ├── components
│   │   │   │   └── .gitkeep
│   │   │   ├── containers
│   │   │   │   ├── index.ts
│   │   │   │   ├── useLoginContainer.ts
│   │   │   │   └── useRegisterContainer.ts
│   │   │   ├── screens
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   └── .gitkeep
│   │   │   └── utilities
│   │   │       └── .gitkeep
│   │   ├── showcase
│   │   │   ├── components
│   │   │   │   ├── Item.tsx
│   │   │   │   ├── Separator.tsx
│   │   │   │   ├── ShowcaseItem.tsx
│   │   │   │   └── index.ts
│   │   │   ├── containers
│   │   │   │   ├── index.ts
│   │   │   │   ├── useBottomSheetContainer.ts
│   │   │   │   ├── useFormContainer.ts
│   │   │   │   ├── useImageContainer.ts
│   │   │   │   ├── useListContainer.tsx
│   │   │   │   ├── useLoaderContainer.ts
│   │   │   │   ├── useModalContainer.tsx
│   │   │   │   ├── usePickerContainer.ts
│   │   │   │   ├── usePressableContainer.ts
│   │   │   │   ├── useShowcaseListContainer.tsx
│   │   │   │   └── useSpacerContainer.tsx
│   │   │   ├── screens
│   │   │   │   ├── BottomSheetsScreen.tsx
│   │   │   │   ├── FormScreen.tsx
│   │   │   │   ├── ImagesScreen.tsx
│   │   │   │   ├── LayoutsScreen.tsx
│   │   │   │   ├── ListScreen.tsx
│   │   │   │   ├── LoaderScreen.tsx
│   │   │   │   ├── ModalsScreen.tsx
│   │   │   │   ├── PickersScreen.tsx
│   │   │   │   ├── PressableScreen.tsx
│   │   │   │   ├── ShowcaseListScreen.tsx
│   │   │   │   ├── SpacersScreen.tsx
│   │   │   │   ├── TextsScreen.tsx
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   └── .gitkeep
│   │   │   └── utilities
│   │   │       └── .gitkeep
│   │   └── tab
│   │       ├── components
│   │       │   └── .gitkeep
│   │       ├── containers
│   │       │   ├── index.ts
│   │       │   ├── useHomeContainer.tsx
│   │       │   └── useProfileContainer.ts
│   │       ├── screens
│   │       │   ├── HomeScreen.tsx
│   │       │   ├── MessagesScreen.tsx
│   │       │   ├── NotificationScreen.tsx
│   │       │   ├── ProfileScreen.tsx
│   │       │   └── index.ts
│   │       ├── services
│   │       │   └── .gitkeep
│   │       └── utilities
│   │           └── .gitkeep
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useApi.ts
│   │   ├── useAppDispatch.ts
│   │   ├── useAppFocus.ts
│   │   ├── useAppForm.ts
│   │   ├── useAppNavigation.ts
│   │   ├── useAppRoute.ts
│   │   ├── useAppSelector.ts
│   │   ├── useAppState.ts
│   │   ├── useAppTranslation.ts
│   │   ├── useBackHandler.ts
│   │   ├── useColor.ts
│   │   ├── useCountdownTimer.ts
│   │   ├── useDebounce.ts
│   │   ├── useFormat.ts
│   │   ├── useInfiniteScroll.ts
│   │   ├── useKeyboard.ts
│   │   ├── useLayout.ts
│   │   ├── useMeasure.ts
│   │   ├── useStyle.ts
│   │   └── useThrottle.ts
│   ├── i18n
│   │   ├── index.ts
│   │   └── locales
│   │       ├── en-US.json
│   │       └── vi-VN.json
│   ├── layouts
│   │   └── .gitkeep
│   ├── navigation
│   │   ├── index.ts
│   │   ├── options.ts
│   │   ├── stacks
│   │   │   └── RootStack.tsx
│   │   ├── styles.ts
│   │   └── tabs
│   │       ├── BottomTabBar.tsx
│   │       └── CustomizedTabBar.tsx
│   ├── providers
│   │   ├── AppProvider.tsx
│   │   ├── LayoutProvider.tsx
│   │   ├── NavigationProvider.tsx
│   │   ├── StoreProvider.tsx
│   │   └── index.ts
│   ├── services
│   │   ├── common.ts
│   │   └── index.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── integration
│   │   │   └── index.ts
│   │   └── slices
│   │       ├── auth.ts
│   │       ├── common.ts
│   │       └── index.ts
│   ├── themes
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   └── styles.ts
│   └── utilities
│       ├── common.ts
│       ├── component.ts
│       ├── format.ts
│       ├── index.ts
│       ├── logger.ts
│       ├── os.ts
│       ├── permission.ts
│       ├── screen.tsx
│       ├── service.ts
│       ├── store.ts
│       ├── style.ts
│       └── validate.ts
├── vendor/
└── tsconfig.json
```