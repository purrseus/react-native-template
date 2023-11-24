import { useTailwind } from '@/hooks';
import { Text, View } from 'react-native';

export default function NoInternet() {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center`}>
      <Text>No internet connection!</Text>
    </View>
  );
}
