import { DEFAULT_FONT_SIZE, DEFAULT_HIT_SLOP, MIN_HEIGHT_INPUT } from '@/core/constants';
import { useTailwind } from '@/hooks';
import { ForwardedRef, forwardRef } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

interface TextInputProps extends RNTextInputProps {
  style?: Style;
}

function TextInput(
  { style, hitSlop = DEFAULT_HIT_SLOP, ...props }: TextInputProps,
  ref: ForwardedRef<RNTextInput>,
) {
  const tw = useTailwind();

  return (
    <RNTextInput
      placeholderTextColor={tw.color('zinc-400')}
      selectionColor={tw.color('emerald-600')}
      {...props}
      ref={ref}
      allowFontScaling={false}
      style={tw.style(
        `p-0 m-0 text-zinc-700 dark:text-white text-[${DEFAULT_FONT_SIZE}px] h-[${MIN_HEIGHT_INPUT}px]`,
        style,
      )}
      hitSlop={hitSlop}
    />
  );
}

export default forwardRef(TextInput);
