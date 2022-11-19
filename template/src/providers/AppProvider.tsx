import { MMKVStorage } from '@store/integration';
import { isAndroid } from '@utilities';
import { PropsWithChildren } from 'react';
import { DevSettings, UIManager } from 'react-native';
import CodePush from 'react-native-code-push';
import LayoutProvider from './LayoutProvider';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';

//#region bootstrap
if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true);

if (__DEV__) {
  const devSettingItems: { title: string; handler: () => void }[] = [
    {
      title: 'Clear All Storage And Reload',
      handler: async () => {
        MMKVStorage.clearAll();
        DevSettings.reload();
      },
    },
  ];

  devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
}
//#endregion

const AppProvider = ({ children }: PropsWithChildren) => (
  <StoreProvider>
    <NavigationProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </NavigationProvider>
  </StoreProvider>
);

export default __DEV__ ? AppProvider : CodePush(AppProvider);
