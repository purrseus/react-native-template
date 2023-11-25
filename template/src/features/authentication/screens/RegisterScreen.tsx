import { Button } from '@/components/core';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { Text, View } from 'react-native';
import { useRegisterContainer } from '../containers';

const RegisterScreen = withHook(useRegisterContainer, ({ goBack }) => {
  const tw = useTailwind();

  return (
    <View style={tw`flex-fill-center gap-y-4`}>
      <Text>RegisterScreen</Text>
      <Button title="Go back" onPress={goBack} />
    </View>
  );
});

export default RegisterScreen;
