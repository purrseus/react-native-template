import { Text } from '@/components/core';
import { useTailwind } from '@/hooks';
import { View } from 'react-native';

export default function NotificationScreen() {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center`}>
      <Text>NotificationScreen</Text>
    </View>
  );
}
