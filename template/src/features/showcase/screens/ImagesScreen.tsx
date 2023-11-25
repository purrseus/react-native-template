import { More } from '@/assets/icons';
import { Image, Text } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { useImageContainer } from '../containers';

const ImagesScreen = withHook(useImageContainer, ({ imageUrl }) => {
  const tw = useTailwind();

  return (
    <StackContainer
      title={ProtectedScreenName.Images}
      wrapperType="scrollView"
      wrapperStyle={tw`py-4 justify-center items-center gap-y-16`}
    >
      <View style={tw`flex-fill-center`}>
        <Text>Image</Text>
        <Image source={imageUrl} style={tw`w-[200px] h-[200px]`} />
      </View>

      <View style={tw`flex-fill-center`}>
        <Text>Cached Image</Text>
        <Image cached source={imageUrl} style={tw`w-[200px] h-[200px]`} />
      </View>

      <View style={tw`flex-fill-center`}>
        <Text>Icon</Text>
        <More stroke={'red'} />
      </View>
    </StackContainer>
  );
});

export default ImagesScreen;
