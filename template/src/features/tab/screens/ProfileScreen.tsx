import { Button, Spacer, Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useProfileContainer } from '../containers';

const ProfileScreen = withHook(useProfileContainer, ({ logout }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>ProfileScreen</Text>
      <Spacer h={16} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
});

export default ProfileScreen;
