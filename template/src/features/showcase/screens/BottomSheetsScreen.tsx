import { BottomSheet, Text } from '@/components/core';
import { StackContainer } from '@/components/shared';
import { ProtectedScreenName } from '@/core/enums';
import { useTailwind } from '@/hooks';
import { withHook } from '@/utils';
import { Separator, ShowcaseItem } from '../components';
import { useBottomSheetContainer } from '../containers';

const BottomSheetsScreen = withHook(
  useBottomSheetContainer,
  ({ showBottomSheet, showActionSheet, bottomSheetRef, bottomSheetSnapPoints }) => {
    const tw = useTailwind();

    return (
      <>
        <StackContainer
          wrapperType="scrollView"
          title={ProtectedScreenName.BottomSheets}
          wrapperStyle={tw`py-4`}
        >
          <ShowcaseItem title="Show BottomSheet" onPress={showBottomSheet} />
          <Separator />
          <ShowcaseItem title="Show ActionSheet" onPress={showActionSheet} />
        </StackContainer>

        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={bottomSheetSnapPoints}>
          <Text>This is a BottomSheet</Text>
        </BottomSheet>
      </>
    );
  },
);

export default BottomSheetsScreen;
