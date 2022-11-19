import { InfiniteList } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { withHook } from '@utilities';
import { useListContainer } from '../containers';

const ListScreen = withHook(useListContainer, ({ renderItem, getPhotos, config }) => {
  return (
    <StackContainer headerTitle={ProtectedScreenName.List}>
      <InfiniteList renderItem={renderItem} requestCallback={getPhotos} config={config} />
    </StackContainer>
  );
});

export default ListScreen;
