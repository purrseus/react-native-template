import { TabScreenName } from '@/core/enums';
import { BottomTabParamList } from '@/core/types';
import {
  HomeScreen,
  MessagesScreen,
  NotificationScreen,
  ProfileScreen,
} from '@/features/tab/screens';
import { useNetwork, useTailwind } from '@/hooks';
import { tabScreenOptions } from '@/navigators/options';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationConfig } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import CustomizedTabBar from './CustomizedTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const TabBar: NonNullable<BottomTabNavigationConfig['tabBar']> = props => (
  <CustomizedTabBar {...props} />
);

export default function BottomTabBar() {
  const tw = useTailwind();
  const onlineScreen = useNetwork();

  return (
    <BottomTab.Navigator
      initialRouteName={TabScreenName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={tw`background-color`}
      tabBar={TabBar}
    >
      <BottomTab.Screen name={TabScreenName.Home} component={onlineScreen(HomeScreen)} />
      <BottomTab.Screen name={TabScreenName.Messages} component={onlineScreen(MessagesScreen)} />
      <BottomTab.Screen
        name={TabScreenName.Notification}
        component={onlineScreen(NotificationScreen)}
      />
      <BottomTab.Screen name={TabScreenName.Profile} component={onlineScreen(ProfileScreen)} />
    </BottomTab.Navigator>
  );
}
