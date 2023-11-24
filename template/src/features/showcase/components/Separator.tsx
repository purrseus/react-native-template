import { useTailwind } from '@/hooks';
import { StyleSheet, View } from 'react-native';

export default function Separator() {
  const tw = useTailwind();

  return <View style={tw`border-[${StyleSheet.hairlineWidth}px] my-4 border-zinc-400`} />;
}
