import { useTheme } from '@hooks';
import { colors } from '@themes';
import { compareMemo } from '@utilities';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';

const StatusBar = compareMemo<StatusBarProps>(({ ...props }) => (
  <RNStatusBar
    translucent
    barStyle={useTheme().isDarkMode ? 'light-content' : 'dark-content'}
    backgroundColor={colors.transparent}
    {...props}
  />
));

export default StatusBar;
