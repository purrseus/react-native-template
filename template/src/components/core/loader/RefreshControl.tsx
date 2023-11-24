import { useTailwind } from '@/hooks';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

export default function RefreshControl(props: RefreshControlProps) {
  const tw = useTailwind();

  return (
    <RNRefreshControl
      {...props}
      colors={[tw.color('emerald-500'), tw.color('green-500')] as string[]}
      progressBackgroundColor={tw.color('zinc-50')}
      tintColor={tw.color('emerald-500')}
    />
  );
}
