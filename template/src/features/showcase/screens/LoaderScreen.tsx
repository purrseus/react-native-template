import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { ShowcaseItem } from '../components';
import { useLoaderContainer } from '../containers';

const LoaderScreen = withHook(useLoaderContainer, ({ handleOverlayLoading }) => {
  const tw = useTailwind();

  return (
    <StackContainer title={ProtectedScreenName.Loader} wrapperStyle={tw`flex-fill-center`}>
      <ShowcaseItem title="Show OverlayLoading in 3 seconds" onPress={handleOverlayLoading} />
    </StackContainer>
  );
});

export default LoaderScreen;
