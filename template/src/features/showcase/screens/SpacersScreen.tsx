import { BottomSpacer } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { View } from 'react-native';
import { ShowcaseItem } from '../components';
import useSpacerContainer from '../containers/useSpacerContainer';

const SpacersScreen = withHook(
  useSpacerContainer,
  ({ showSafeAreaSpacer, showHalfSafeAreaSpacer, status }) => {
    const tw = useTailwind();

    return (
      <StackContainer title={ProtectedScreenName.Spacers}>
        <View style={tw`flex-fill-center bg-zinc-400 gap-y-8`}>
          <ShowcaseItem title="Show safeArea spacer" onPress={showSafeAreaSpacer} />
          <ShowcaseItem title="Show halfSafeArea spacer" onPress={showHalfSafeAreaSpacer} />
        </View>

        {status === 'safeArea' && <BottomSpacer type="safeArea" />}
        {status === 'halfSafeArea' && <BottomSpacer type="halfSafeArea" />}
      </StackContainer>
    );
  },
);

export default SpacersScreen;
