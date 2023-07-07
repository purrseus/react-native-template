import { InfiniteList } from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { withHook } from '@utilities';
import { Item } from '../components';
import { useListContainer } from '../containers';
import listAPI from '../services/apis/list';

const ListScreen = withHook(useListContainer, ({ photosQueryKey }) => {
  return (
    <StackContainer title={ProtectedScreenName.List}>
      <InfiniteList
        renderItem={({ item }) => <Item {...item} />}
        queryKey={photosQueryKey}
        queryFn={listAPI.getPhotos}
        estimatedItemSize={200}
      />
    </StackContainer>
  );
});

export default ListScreen;
