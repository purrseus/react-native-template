import { PADDING_VERTICAL_INPUT } from '@/core/constants';
import { useTailwind } from '@/hooks';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import TextInput from './TextInput';

export interface IconTextInputProps extends RNTextInputProps {
  IconLeftComponent?: ReactNode;
  IconRightComponent?: ReactNode;
  containerStyle?: Style;
  style?: Style;
}

function IconTextInput(
  { IconLeftComponent, IconRightComponent, containerStyle, style, ...props }: IconTextInputProps,
  ref: ForwardedRef<RNTextInput>,
) {
  const tw = useTailwind();

  return (
    <View
      style={tw.style(
        `flex-row items-center px-2 py-[${PADDING_VERTICAL_INPUT}px] bg-zinc-300 rounded-xl gap-x-2`,
        containerStyle,
      )}
    >
      {IconLeftComponent}
      <TextInput {...props} ref={ref} style={tw.style('flex-1', style)} />
      {IconRightComponent}
    </View>
  );
}

export default forwardRef(IconTextInput);
