import { CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { createField } from '@utilities';
import { forwardRef, RefAttributes } from 'react';
import { StyleProp, TextInput as RNTextInput, View, ViewStyle } from 'react-native';
import MultilineTextInput, {
  MultilineTextInputProps,
} from '../Text/Input/Multiline/MultilineTextInput';
import IconTextInput, { IconTextInputProps } from '../Text/Input/Singleline/IconTextInput';
import Text from '../Text/Text';

type MixinTextInputProps<T extends boolean = false> = (T extends true
  ? MultilineTextInputProps
  : IconTextInputProps) &
  CommonFieldProps<string, true>;

type TextInputProps<T extends boolean = false> = {
  multiline?: T;
  wrapperStyle?: StyleProp<ViewStyle>;
} & MixinTextInputProps<T>;

const _TextInput = createField<RNTextInput, TextInputProps>(
  forwardRef(
    ({ label, errorText, placeholder, multiline, containerStyle, wrapperStyle, ...props }, ref) => {
      const styles = useStyle(createStyles);
      const TextInputComponent = multiline ? MultilineTextInput : IconTextInput;

      return (
        <View style={containerStyle}>
          {!!label && <Text style={styles.label}>{label}</Text>}
          <TextInputComponent
            {...props}
            ref={ref}
            placeholder={placeholder || label}
            containerStyle={wrapperStyle}
          />
          {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
      );
    },
  ),
  true,
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    errorText: {
      color: colors.red,
      marginTop: 4,
    },
  });

const TextInput = _TextInput as <T extends boolean = false>(
  props: TextInputProps<T> & RefAttributes<RNTextInput>,
) => JSX.Element;

export default TextInput;
