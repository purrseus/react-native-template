import { List } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { withHook } from '@utilities';
import useShowcaseListContainer from '../containers/useShowcaseListContainer';

const ShowcaseListScreen = withHook(
  useShowcaseListContainer,
  ({ data, renderItem, ItemSeparatorComponent }) => {
    const styles = useStyle(createStyles);

    return (
      <StackContainer headerTitle={ProtectedScreenName.ShowcaseList}>
        <List
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.scrollView}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </StackContainer>
    );
  },
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      padding: 16,
    },
  });

export default ShowcaseListScreen;
