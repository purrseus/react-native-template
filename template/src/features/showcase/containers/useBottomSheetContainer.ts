import { ActionSheetMethods } from '@core/interfaces';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRef } from 'react';

const useBottomSheetContainer = () => {
  const bottomSheetSnapPoints = ['30%', '60%', '100%'];
  const actionSheetOptions = ['Cancel', 'Option 1', 'Option 2'];

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const actionSheetRef = useRef<ActionSheetMethods | null>(null);

  const showBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const showActionSheet = () => actionSheetRef.current?.show();

  return {
    bottomSheetRef,
    actionSheetRef,
    showBottomSheet,
    showActionSheet,
    bottomSheetSnapPoints,
    actionSheetOptions,
  };
};

export default useBottomSheetContainer;
