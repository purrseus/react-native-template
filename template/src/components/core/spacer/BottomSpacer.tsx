import { useTailwind } from '@/hooks';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSpacerProps {
  type: 'safeArea' | 'halfSafeArea';
}

const getHeights = (bottom: number): Record<BottomSpacerProps['type'], number> => ({
  safeArea: bottom,
  halfSafeArea: bottom / 2,
});

export default function BottomSpacer({ type }: BottomSpacerProps) {
  const tw = useTailwind();

  return <View style={tw`h-[${getHeights(useSafeAreaInsets().bottom)[type]}px]`} />;
}
