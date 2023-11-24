import { useTailwind } from '@/hooks';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';

export default function StatusBar(props: StatusBarProps) {
  const tw = useTailwind();

  return (
    <RNStatusBar
      translucent
      barStyle={tw.prefixMatch('dark') ? 'light-content' : 'dark-content'}
      backgroundColor={tw.color('transparent')}
      {...props}
    />
  );
}
