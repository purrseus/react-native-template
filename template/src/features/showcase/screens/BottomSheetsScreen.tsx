import { BottomSheet, Text } from '@components/core';
import ActionSheet from '@components/core/BottomSheet/ActionSheet';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { withHook } from '@utilities';
import { Separator, ShowcaseItem } from '../components';
import { useBottomSheetContainer } from '../containers';

const BottomSheetsScreen = withHook(
  useBottomSheetContainer,
  ({
    showBottomSheet,
    showActionSheet,
    bottomSheetRef,
    bottomSheetSnapPoints,
    actionSheetRef,
    actionSheetOptions,
  }) => {
    const styles = useStyle(createStyles);

    return (
      <>
        <StackContainer
          wrapperType="scrollView"
          title={ProtectedScreenName.BottomSheets}
          wrapperStyle={styles.scrollView}
        >
          <ShowcaseItem title="Show BottomSheet" onPress={showBottomSheet} />
          <Separator />
          <ShowcaseItem title="Show ActionSheet" onPress={showActionSheet} />
        </StackContainer>

        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={bottomSheetSnapPoints}>
          <Text>This is a BottomSheet</Text>
        </BottomSheet>
        <ActionSheet ref={actionSheetRef} options={actionSheetOptions} onSelect={print} />
      </>
    );
  },
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default BottomSheetsScreen;
