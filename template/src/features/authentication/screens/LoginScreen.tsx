import { Button, Text } from '@/components/core';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils/screen';
import { View } from 'react-native';
import { useLoginContainer } from '../containers';

const LoginScreen = withHook(useLoginContainer, ({ handleLogin, navigateToRegister }) => {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center gap-y-4`}>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={navigateToRegister} />
    </View>
  );
});

export default LoginScreen;
