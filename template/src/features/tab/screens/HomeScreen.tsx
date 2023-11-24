import { Button, Text } from '@/components/core';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { useHomeContainer } from '../containers';

const HomeScreen = withHook(useHomeContainer, ({ goToShowcase }) => {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center gap-y-4`}>
      <Text>HomeScreen</Text>
      <Button gradient title="Show me the examples" onPress={goToShowcase} />
    </View>
  );
});

export default HomeScreen;
