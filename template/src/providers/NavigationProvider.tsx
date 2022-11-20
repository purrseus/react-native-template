import { navigationRef } from '@navigation';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer } from '@react-navigation/native';
import { PropsWithChildren } from 'react';

const useNavigationFlipper = __DEV__ ? useFlipper : null;

const NavigationProvider = ({ children }: PropsWithChildren) => {
  useNavigationFlipper?.(navigationRef);

  return <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>;
};

export default NavigationProvider;
