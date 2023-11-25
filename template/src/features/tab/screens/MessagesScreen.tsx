import { Text } from '@/components/core';
import { useTailwind } from '@/hooks';
import { View } from 'react-native';

export default function MessagesScreen() {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center`}>
      <Text>MessagesScreen</Text>
    </View>
  );
}
