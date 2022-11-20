import { useColor } from '@hooks';
import { compareMemo } from '@utilities';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

const RefreshControl = compareMemo<RefreshControlProps>(({ ...props }) => {
  const colors = useColor();

  return (
    <RNRefreshControl
      {...props}
      colors={[colors.primary, colors.secondary]}
      progressBackgroundColor={colors.refreshControlBackground}
      tintColor={colors.primary}
    />
  );
});

export default RefreshControl;
