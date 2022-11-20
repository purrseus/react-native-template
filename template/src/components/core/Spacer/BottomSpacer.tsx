import { TAB_BAR_HEIGHT } from '@core/constants';
import { compareMemo } from '@utilities';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from './Spacer';

interface BottomSpacerProps {
  type: 'bottomTab' | 'safeArea' | 'halfSafeArea';
}

const height: Record<NonNullable<BottomSpacerProps['type']>, (bottom: number) => number> = {
  bottomTab: bottom => bottom / 2 + TAB_BAR_HEIGHT,
  safeArea: bottom => bottom,
  halfSafeArea: bottom => bottom / 2,
};

const BottomSpacer = compareMemo<BottomSpacerProps>(({ type }) => (
  <Spacer h={height[type](useSafeAreaInsets().bottom)} />
));

export default BottomSpacer;
