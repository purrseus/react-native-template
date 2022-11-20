import { PADDING_VERTICAL_INPUT } from '@core/constants';
import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollView = ({ children, ...props }: KeyboardAwareScrollViewProps) => (
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

export default KeyboardAwareScrollView;
