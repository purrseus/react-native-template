import { MAX_HEIGHT_INPUT, MIN_HEIGHT_INPUT } from '@/core/constants';
import { useTailwind } from '@/hooks';
import { ForwardedRef, forwardRef } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import TextInput from '../singleline/TextInput';

export interface MultilineTextInputProps extends RNTextInputProps {
  dynamicHeight?: boolean;
  containerStyle?: Style;
  style?: Style;
}

function MultilineTextInput(
  { dynamicHeight = false, style, containerStyle, ...props }: MultilineTextInputProps,
  ref: ForwardedRef<RNTextInput>,
) {
  const tw = useTailwind();

  return (
    <View
      style={tw.style('px-2 android:py-[8.2px] ios:py-3 bg-zinc-300 rounded-xl', containerStyle)}
    >
      <TextInput
        {...props}
        multiline
        ref={ref}
        style={tw.style(
          'ios:pt-0',
          dynamicHeight
            ? `h-auto min-h-[${MIN_HEIGHT_INPUT}px] max-h-[${MAX_HEIGHT_INPUT}px]`
            : 'h-[120px]',
          !dynamicHeight && { textAlignVertical: 'top' },
          style,
        )}
      />
    </View>
  );
}

export default forwardRef(MultilineTextInput);
