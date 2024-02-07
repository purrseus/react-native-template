import { useCommonStore } from '@/stores';
import { Appearance, DevSettings, UIManager } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import { changeKeyboardAppearance } from './common';
import { MMKVStorage } from './store';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true);

if (isIos()) {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarManageBehaviourBy('subviews');
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setShouldShowToolbarPlaceholder(false);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true);

  Appearance.addChangeListener(({ colorScheme }) => {
    if (useCommonStore.getState().theme === 'auto') changeKeyboardAppearance(colorScheme);
  });
}

if (__DEV__) {
  const devSettingItems: { title: string; handler: () => void }[] = [
    {
      title: 'Clear MMKV Storage And Reload',
      handler: () => {
        MMKVStorage.clearAll();
        DevSettings.reload();
      },
    },
  ];

  devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
}
