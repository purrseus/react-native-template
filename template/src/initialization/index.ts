import '@/core/declarations';
import 'react-native-gesture-handler';

import I18n from '@/i18n';
import { IOSKeyboardManager, Store } from '@/utils';
import { DevSettings, UIManager } from 'react-native';

I18n.init();
IOSKeyboardManager.init();
Store.init();

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true);

if (__DEV__) {
  const devSettingItems: { title: string; handler: () => void }[] = [
    {
      title: 'Clear MMKV Storage And Reload',
      handler: () => {
        Store.MMKVStorage.clearAll();
        DevSettings.reload();
      },
    },
  ];

  devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
}
