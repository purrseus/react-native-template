import { Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useProfileContainer } from '../containers';

const ProfileScreen = withHook(useProfileContainer, ({ logout }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={logout}>ProfileScreen</Text>
    </View>
  );
});

export default ProfileScreen;
