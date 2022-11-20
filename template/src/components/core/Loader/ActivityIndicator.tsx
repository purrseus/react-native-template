import { colors } from '@themes';
import { compareMemo } from '@utilities';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = compareMemo<ActivityIndicatorProps>(props => (
  <RNActivityIndicator color={colors.primary} {...props} />
));

export default ActivityIndicator;
