import { ProtectedScreenName, UnprotectedScreenName } from '@core/enums';
import { RootStackParamList } from '@core/types';
import { LoginScreen, RegisterScreen } from '@features/authentication/screens';
import {
  BottomSheetsScreen,
  FormScreen,
  ImagesScreen,
  LayoutsScreen,
  ListScreen,
  LoaderScreen,
  ModalsScreen,
  PickersScreen,
  PressableScreen,
  ShowcaseListScreen,
  SpacersScreen,
  TextsScreen,
} from '@features/showcase/screens';
import { useAppSelector, useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import createStyles from '@navigation/styles';
import BottomTabBar from '@navigation/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const UnprotectedScreens = (
  <NativeStack.Group>
    <NativeStack.Screen name={UnprotectedScreenName.Login} component={LoginScreen} />
    <NativeStack.Screen name={UnprotectedScreenName.Register} component={RegisterScreen} />
  </NativeStack.Group>
);

const ProtectedScreens = (
  <NativeStack.Group>
    <NativeStack.Screen name={ProtectedScreenName.BottomTab} component={BottomTabBar} />
    {/* Showcase */}
    <NativeStack.Screen name={ProtectedScreenName.ShowcaseList} component={ShowcaseListScreen} />
    <NativeStack.Screen name={ProtectedScreenName.BottomSheets} component={BottomSheetsScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Pressable} component={PressableScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Form} component={FormScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Images} component={ImagesScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Layouts} component={LayoutsScreen} />
    <NativeStack.Screen name={ProtectedScreenName.List} component={ListScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Loader} component={LoaderScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Modals} component={ModalsScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Pickers} component={PickersScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Spacers} component={SpacersScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Texts} component={TextsScreen} />
  </NativeStack.Group>
);

const RootNavigator = () => {
  const styles = useStyle(createStyles);
  const { accessToken, refreshToken } = useAppSelector(state => state.auth);
  const isAuthenticated = !!accessToken?.length && !!refreshToken?.length;

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={
        isAuthenticated ? UnprotectedScreenName.Login : ProtectedScreenName.BottomTab
      }
    >
      {isAuthenticated ? ProtectedScreens : UnprotectedScreens}
    </NativeStack.Navigator>
  );
};

export default RootNavigator;
