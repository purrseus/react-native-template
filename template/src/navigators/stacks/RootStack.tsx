import { ProtectedScreenName, PublicScreenName } from '@/core/enums';
import { RootStackParamList } from '@/core/types';
import { LoginScreen, RegisterScreen } from '@/features/authentication/screens';
import {
  BottomSheetsScreen,
  FormScreen,
  ImagesScreen,
  ListScreen,
  LoaderScreen,
  ModalsScreen,
  PickersScreen,
  ShowcaseListScreen,
  SpacersScreen,
  TextsScreen,
  TouchableScreen,
} from '@/features/showcase/screens';
import { useTailwind } from '@/hooks';
import { stackScreenOptions } from '@/navigators/options';
import BottomTabBar from '@/navigators/tabs/BottomTabBar';
import { useAuthStore } from '@/stores';
import { navigationRef } from '@/utils';
import { useFlipper } from '@react-navigation/devtools';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const useNavigationFlipper = __DEV__ ? useFlipper : null;

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const PublicScreens = (
  <NativeStack.Group>
    <NativeStack.Screen name={PublicScreenName.Login} component={LoginScreen} />
    <NativeStack.Screen name={PublicScreenName.Register} component={RegisterScreen} />
  </NativeStack.Group>
);

const ProtectedScreens = (
  <NativeStack.Group>
    {/* BottomTab */}
    <NativeStack.Screen name={ProtectedScreenName.BottomTab} component={BottomTabBar} />

    {/* Showcase */}
    <NativeStack.Screen name={ProtectedScreenName.ShowcaseList} component={ShowcaseListScreen} />
    <NativeStack.Screen name={ProtectedScreenName.BottomSheets} component={BottomSheetsScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Touchable} component={TouchableScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Form} component={FormScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Images} component={ImagesScreen} />
    <NativeStack.Screen name={ProtectedScreenName.List} component={ListScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Loader} component={LoaderScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Modals} component={ModalsScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Pickers} component={PickersScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Spacers} component={SpacersScreen} />
    <NativeStack.Screen name={ProtectedScreenName.Texts} component={TextsScreen} />
  </NativeStack.Group>
);

export default function RootStack() {
  const tw = useTailwind();
  const isAuthenticated = useAuthStore(
    ({ accessToken, refreshToken }) => accessToken?.isNotEmpty && refreshToken?.isNotEmpty,
  );
  useNavigationFlipper?.(navigationRef);

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: tw`background-color` }}
      initialRouteName={isAuthenticated ? PublicScreenName.Login : ProtectedScreenName.BottomTab}
    >
      {isAuthenticated ? ProtectedScreens : PublicScreens}
    </NativeStack.Navigator>
  );
}
