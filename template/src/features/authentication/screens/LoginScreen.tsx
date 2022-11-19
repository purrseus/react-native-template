import { PressArea, Spacer, Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities/screen';
import { View } from 'react-native';
import { useLoginContainer } from '../containers';

const LoginScreen = withHook(useLoginContainer, ({ handleLogin, navigateToRegister }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <PressArea onPress={handleLogin}>
        <Text>LoginScreen</Text>
      </PressArea>

      <Spacer h={32} />

      <PressArea onPress={navigateToRegister}>
        <Text>Go to Register</Text>
      </PressArea>
    </View>
  );
});

export default LoginScreen;
