import { useTailwind } from '@/hooks';
import { ActivityIndicatorProps, ActivityIndicator as RNActivityIndicator } from 'react-native';

export default function ActivityIndicator(props: ActivityIndicatorProps) {
  const tw = useTailwind();

  return <RNActivityIndicator color={tw.color('emerald-500')} {...props} />;
}
