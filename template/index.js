import '@/core/declarations';
import '@/libs/i18n';
import 'react-native-gesture-handler';

import { onAppBootstrap } from '@/utils';
import { AppRegistry } from 'react-native';
import CodePush from 'react-native-code-push';
import { name as appName } from './app.json';
import App from './src/App';

onAppBootstrap();
AppRegistry.registerComponent(appName, () => (__DEV__ ? App : CodePush(App)));
