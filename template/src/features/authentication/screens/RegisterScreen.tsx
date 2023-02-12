import { Button, Spacer } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { Text, View } from 'react-native';
import { useRegisterContainer } from '../containers';

const RegisterScreen = withHook(useRegisterContainer, ({ goBack }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>RegisterScreen</Text>
      <Spacer h={16} />
      <Button title="Go back" onPress={goBack} />
    </View>
  );
});

export default RegisterScreen;
