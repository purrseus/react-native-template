import { ProtectedScreenName, TabScreenName, UnprotectedScreenName } from '@core/enums';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, ProtectedParamList, UnprotectedParamList } from './navigation';

export type ProtectedScreenProps<Name extends ProtectedScreenName> = NativeStackScreenProps<
  ProtectedParamList,
  Name
>;

export type UnprotectedScreenProps<Name extends UnprotectedScreenName> = NativeStackScreenProps<
  UnprotectedParamList,
  Name
>;

export type TabScreenProps<Name extends TabScreenName> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, Name>,
  NativeStackScreenProps<ProtectedParamList>
>;
