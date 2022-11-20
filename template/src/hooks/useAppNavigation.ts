import { RootStackParamList } from '@core/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const useAppNavigation = <R extends keyof RootStackParamList>() =>
  useNavigation<NavigationProp<RootStackParamList, R>>();

export default useAppNavigation;
