import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useAppActionSheet } from '@/hooks';
import { useRef } from 'react';

const useBottomSheetContainer = () => {
  const bottomSheetSnapPoints = ['30%', '60%', '100%'];
  const showActionSheet = useAppActionSheet(
    { options: ['Cancel', 'Option 1', 'Option 2'], cancelButtonIndex: 0 },
    print,
  );

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const showBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  return {
    bottomSheetRef,
    showBottomSheet,
    showActionSheet,
    bottomSheetSnapPoints,
  };
};

export default useBottomSheetContainer;
