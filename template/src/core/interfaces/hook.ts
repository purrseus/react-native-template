import { darkTheme, lightTheme } from '@themes';
import { ScaledSize, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export interface StyleCallbackParams {
  dimensions: ScaledSize;
  colors: typeof darkTheme | typeof lightTheme;
  edgeInsets: EdgeInsets;
  create: typeof StyleSheet.create;
}
