import { List } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import useShowcaseListContainer from '../containers/useShowcaseListContainer';

const ShowcaseListScreen = withHook(useShowcaseListContainer, ({ data, renderItem }) => {
  const tw = useTailwind();

  return (
    <StackContainer title={ProtectedScreenName.ShowcaseList}>
      <List data={data} renderItem={renderItem} contentContainerStyle={tw`p-4 gap-y-4`} />
    </StackContainer>
  );
});

export default ShowcaseListScreen;
