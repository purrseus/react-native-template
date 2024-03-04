import '@/initialization';

import App from '@/App';
import { AppRegistry } from 'react-native';
import CodePush from 'react-native-code-push';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => (__DEV__ ? App : CodePush(App)));
