import { Button, Spacer, Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useHomeContainer } from '../containers';

const HomeScreen = withHook(useHomeContainer, ({ goToShowcase }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>HomeScreen</Text>
      <Spacer h={16} />
      <Button gradient title="Show me the examples" onPress={goToShowcase} />
    </View>
  );
});

export default HomeScreen;
