import { useTailwind } from '@/hooks';
import { Text, View } from 'react-native';

export default function Error() {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center`}>
      <Text>Error!</Text>
    </View>
  );
}
