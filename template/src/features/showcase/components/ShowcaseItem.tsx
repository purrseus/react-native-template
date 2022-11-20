import { PressArea, Text } from '@components/core';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';

interface ShowcaseItemProps {
  title: string;
  onPress: () => void;
}

const ShowcaseItem = compareMemo<ShowcaseItemProps>(({ title, onPress }) => {
  const styles = useStyle(createStyles);

  return (
    <PressArea onPress={onPress} style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
    </PressArea>
  );
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    item: {
      padding: 16,
      backgroundColor: colors.backgroundImage,
      borderRadius: 8,
      alignItems: 'center',
    },
    itemText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ShowcaseItem;
