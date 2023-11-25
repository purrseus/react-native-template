import { Button, Text } from '@/components/core';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { useProfileContainer } from '../containers';

const ProfileScreen = withHook(useProfileContainer, ({ logout }) => {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center gap-y-4`}>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
});

export default ProfileScreen;
