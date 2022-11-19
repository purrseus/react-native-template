import { Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useHomeContainer } from '../containers';

const HomeScreen = withHook(useHomeContainer, ({ goToShowcase }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={goToShowcase}>HomeScreen</Text>
    </View>
  );
});

export default HomeScreen;
