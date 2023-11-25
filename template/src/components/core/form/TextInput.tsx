import { FieldProps } from '@/core/types';
import { useTailwind } from '@/hooks';
import { View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import MultilineTextInput, { MultilineTextInputProps } from '../input/multiline/MultilineTextInput';
import IconTextInput, { IconTextInputProps } from '../input/singleline/IconTextInput';
import Text from '../text/Text';

type MixinTextInputProps<T> = T extends true ? MultilineTextInputProps : IconTextInputProps;

type TextInputProps<T> = MixinTextInputProps<T> & {
  multiline?: T;
  wrapperStyle?: Style;
};

export default function TextInput<T extends boolean = false>({
  label,
  name,
  placeholder,
  multiline,
  containerStyle,
  wrapperStyle,
  _fieldProps,
  ...props
}: FieldProps<TextInputProps<T>>) {
  const tw = useTailwind();
  const { field, fieldState } = _fieldProps!;
  const TextInputComponent = multiline ? MultilineTextInput : IconTextInput;

  return (
    <View id={name} style={tw.style('gap-y-0.5', containerStyle)}>
      {!!label && <Text style={tw`text-sm font-bold`}>{label}</Text>}
      <TextInputComponent
        {...props}
        ref={field.ref}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        placeholder={placeholder || label}
        containerStyle={wrapperStyle}
      />
      {!!fieldState.error?.message && (
        <Text style={tw`text-red-600`}>{fieldState.error.message}</Text>
      )}
    </View>
  );
}
