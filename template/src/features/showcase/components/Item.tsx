import { Image, Text, Touchable } from '@/components/core';
import { useTailwind } from '@/hooks';
import { View } from 'react-native';
import { Photos } from '../services/schemas';

const Item = (props: Photos[number]) => {
  const tw = useTailwind();
  const handleOnPress = () => print(props);

  return (
    <Touchable
      style={tw`p-4 my-2 mx-4 rounded-2xl bg-white dark:bg-zinc-700 flex-row shadow-md gap-x-4`}
      onPress={handleOnPress}
    >
      <Image source={{ uri: props.thumbnailUrl }} style={tw`w-[100px] h-[100px] rounded-2xl`} />

      <View style={tw`flex-1`}>
        <Text style={tw`font-bold`}>{formatReferenceType(props)}</Text>
      </View>
    </Touchable>
  );
};

export default Item;
