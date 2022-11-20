import { Image, Row, Spacer, Text } from '@components/core';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { createShadow, referenceTypeFormatter } from '@utilities';
import { View } from 'react-native';
import { Data } from '../containers/useListContainer';

const Item = ({ thumbnailUrl, ...props }: Data) => {
  const styles = useStyle(createStyles);

  return (
    <Row style={styles.container}>
      <Image source={{ uri: thumbnailUrl }} style={styles.image} />

      <Spacer w={16} />

      <View style={globalStyles.flexFill}>
        <Text style={styles.text}>{referenceTypeFormatter(props)}</Text>
      </View>
    </Row>
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 16,
      backgroundColor: colors.white,
      ...createShadow(colors.shadow, [0, 0], 0.1, 8, 16),
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 16,
    },
    text: {
      fontWeight: 'bold',
    },
  });

export default Item;
