import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { ShowcaseItem } from '../components';
import { useLoaderContainer } from '../containers';

const LoaderScreen = withHook(useLoaderContainer, ({ handleOverlayLoading }) => {
  return (
    <StackContainer
      headerTitle={ProtectedScreenName.Loader}
      wrapperStyle={globalStyles.flexFillCenter}
    >
      <ShowcaseItem title="Show OverlayLoading in 3 seconds" onPress={handleOverlayLoading} />
    </StackContainer>
  );
});

export default LoaderScreen;
