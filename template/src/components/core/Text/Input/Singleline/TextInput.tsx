import { DEFAULT_FONT_SIZE, DEFAULT_HIT_SLOP, MIN_HEIGHT_INPUT } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { forwardRef } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

const TextInput = compareMemo<RNTextInput, RNTextInputProps>(
  forwardRef(({ style, hitSlop = DEFAULT_HIT_SLOP, ...props }, ref) => {
    const styles = useStyle(createStyles);

    return (
      <RNTextInput
        placeholderTextColor={styles.placeholder.color}
        selectionColor={styles.selection.color}
        {...props}
        ref={ref}
        allowFontScaling={false}
        style={[styles.input, style]}
        hitSlop={hitSlop}
      />
    );
  }),
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    input: {
      padding: 0,
      margin: 0,
      color: colors.primaryText,
      fontSize: DEFAULT_FONT_SIZE,
      height: MIN_HEIGHT_INPUT,
    },
    placeholder: {
      color: colors.darkGray,
    },
    selection: {
      color: colors.primary,
    },
  });

export default TextInput;
