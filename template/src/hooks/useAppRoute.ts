import { RootStackParamList } from '@core/types';
import { RouteProp, useRoute } from '@react-navigation/native';

const useAppRoute = <R extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, R>>();

export default useAppRoute;
