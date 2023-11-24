import { ProtectedScreenName, TabScreenName, PublicScreenName } from '@/core/enums';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, ProtectedParamList, PublicParamList } from './navigator';

export type ProtectedScreenProps<Name extends ProtectedScreenName> = NativeStackScreenProps<
  ProtectedParamList,
  Name
>;

export type PublicScreenProps<Name extends PublicScreenName> = NativeStackScreenProps<
  PublicParamList,
  Name
>;

export type TabScreenProps<Name extends TabScreenName> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, Name>,
  NativeStackScreenProps<ProtectedParamList>
>;
