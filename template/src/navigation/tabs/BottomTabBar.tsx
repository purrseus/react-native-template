import { TabScreenName } from '@core/enums';
import { BottomTabParamList } from '@core/types';
import {
  HomeScreen,
  MessagesScreen,
  NotificationScreen,
  ProfileScreen,
} from '@features/tab/screens';
import { useStyle } from '@hooks';
import { tabScreenOptions } from '@navigation/options';
import createStyles from '@navigation/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomizedTabBar from './CustomizedTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar = () => {
  const styles = useStyle(createStyles);

  return (
    <BottomTab.Navigator
      initialRouteName={TabScreenName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={styles.screenStyle}
      tabBar={props => <CustomizedTabBar {...props} />}
    >
      <BottomTab.Screen name={TabScreenName.Home} component={HomeScreen} />
      <BottomTab.Screen name={TabScreenName.Messages} component={MessagesScreen} />
      <BottomTab.Screen name={TabScreenName.Notification} component={NotificationScreen} />
      <BottomTab.Screen name={TabScreenName.Profile} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;
