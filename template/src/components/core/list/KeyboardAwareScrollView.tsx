import { PADDING_VERTICAL_INPUT } from '@/core/constants';
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

export default function KeyboardAwareScrollView({
  children,
  ...props
}: KeyboardAwareScrollViewProps) {
  return (
    <RNKeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      automaticallyAdjustsScrollIndicatorInsets={false}
      extraScrollHeight={PADDING_VERTICAL_INPUT}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      {...props}
    >
      {children}
    </RNKeyboardAwareScrollView>
  );
}
