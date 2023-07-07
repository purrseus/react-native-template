import { Button, Spacer, Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities/screen';
import { View } from 'react-native';
import { useLoginContainer } from '../containers';

const LoginScreen = withHook(useLoginContainer, ({ handleLogin, navigateToRegister }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>LoginScreen</Text>
      <Spacer h={16} />
      <Button title="Login" onPress={handleLogin} />
      <Spacer h={16} />
      <Button title="Go to Register" onPress={navigateToRegister} />
    </View>
  );
});

export default LoginScreen;
