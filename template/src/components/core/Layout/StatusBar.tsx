import { colors } from '@themes';
import { compareMemo } from '@utilities';
import { StatusBar as RNStatusBar, StatusBarProps, useColorScheme } from 'react-native';

const StatusBar = compareMemo<StatusBarProps>(({ ...props }) => (
  <RNStatusBar
    translucent
    barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'}
    backgroundColor={colors.transparent}
    {...props}
  />
));

export default StatusBar;
