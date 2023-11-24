import { useTailwind } from '@/hooks';
import { Text, View } from 'react-native';

export default function Empty() {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center`}>
      <Text>Empty!</Text>
    </View>
  );
}
