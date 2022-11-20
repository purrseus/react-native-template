import { DEFAULT_FONT_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import PressArea, { PressAreaProps } from '../Pressable/PressArea';

export interface TextProps extends RNTextProps, Pick<PressAreaProps, 'hitSlop' | 'throttle'> {}

const Text = compareMemo<TextProps>(({ style, onPress, hitSlop = 8, throttle, ...props }) => {
  const styles = useStyle(createStyles);

  const TextComponent = () => (
    <RNText allowFontScaling={false} {...props} style={[styles.text, style]} />
  );

  return onPress ? (
    <PressArea {...{ onPress, hitSlop, throttle }} style={styles.pressArea}>
      <TextComponent />
    </PressArea>
  ) : (
    <TextComponent />
  );
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: colors.primaryText,
    },
    pressArea: {
      flexWrap: 'wrap',
    },
  });

export default Text;
