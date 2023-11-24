import { DEFAULT_BACKDROP_OPACITY } from '@/core/constants';
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTailwind } from '@/hooks';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Style } from 'twrnc/dist/esm/types';

interface BottomSheetProps
  extends RNBottomSheetProps,
    Pick<BottomSheetDefaultBackdropProps, 'enableTouchThrough'> {
  backdropOpacity?: number;
  backdropPressBehavior?: BottomSheetDefaultBackdropProps['pressBehavior'];
  hasHandle?: boolean;
  handleStyle?: Style;
  handleIndicatorStyle?: Style;
  backgroundStyle?: Style;
}

function BottomSheet(
  {
    backdropOpacity = DEFAULT_BACKDROP_OPACITY,
    enableTouchThrough,
    backdropPressBehavior,
    hasHandle = true,
    handleStyle,
    handleIndicatorStyle,
    backgroundStyle,
    ...props
  }: BottomSheetProps,
  ref: ForwardedRef<BottomSheetMethods>,
) {
  const tw = useTailwind();
  const { top } = useSafeAreaInsets();

  const backdropComponent = useCallback(
    (backdropProps: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        enableTouchThrough={enableTouchThrough}
        pressBehavior={backdropPressBehavior}
        opacity={backdropOpacity}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [backdropOpacity, enableTouchThrough, backdropPressBehavior],
  );

  return (
    <RNBottomSheet
      {...props}
      {...{ ref, backdropComponent }}
      keyboardBlurBehavior="restore"
      topInset={top}
      handleStyle={tw.style('h-4 py-0 flex-center', !hasHandle && 'hidden', handleStyle)}
      handleIndicatorStyle={tw.style('bg-zinc-500 dark:bg-zinc-100', handleIndicatorStyle)}
      backgroundStyle={tw.style(
        'bg-white dark:bg-zinc-800 rounded-t-3xl shadow-black dark:shadow-zinc-200 shadow-opacity-10 shadow-radius-2 elevation-16',
        backgroundStyle,
      )}
    />
  );
}

export default forwardRef(BottomSheet);
