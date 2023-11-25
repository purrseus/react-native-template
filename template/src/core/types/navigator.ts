import { ProtectedScreenName, TabScreenName, PublicScreenName } from '@/core/enums';
import { NavigatorScreenParams } from '@react-navigation/native';

export type PublicParamList = {
  [PublicScreenName.Login]: undefined;
  [PublicScreenName.Register]: undefined;
};

export type BottomTabParamList = {
  [TabScreenName.Home]: undefined;
  [TabScreenName.Messages]: undefined;
  [TabScreenName.Notification]: undefined;
  [TabScreenName.Profile]: undefined;
};

export type ProtectedParamList = {
  [ProtectedScreenName.BottomTab]: NavigatorScreenParams<BottomTabParamList>;
  // Showcase
  [ProtectedScreenName.ShowcaseList]: undefined;
  [ProtectedScreenName.BottomSheets]: undefined;
  [ProtectedScreenName.Touchable]: undefined;
  [ProtectedScreenName.Form]: undefined;
  [ProtectedScreenName.Images]: undefined;
  [ProtectedScreenName.List]: undefined;
  [ProtectedScreenName.Loader]: undefined;
  [ProtectedScreenName.Modals]: undefined;
  [ProtectedScreenName.Pickers]: undefined;
  [ProtectedScreenName.Spacers]: undefined;
  [ProtectedScreenName.Texts]: undefined;
};

export type RootStackParamList = PublicParamList & ProtectedParamList;
