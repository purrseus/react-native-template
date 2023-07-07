import { DEFAULT_FONT_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import Touchable, { TouchableProps } from '../Touchable/Touchable';

export interface TextProps extends RNTextProps, Pick<TouchableProps, 'hitSlop' | 'throttle'> {}

const Text = compareMemo<TextProps>(({ style, onPress, hitSlop = 8, throttle, ...props }) => {
  const styles = useStyle(createStyles);

  const TextComponent = () => (
    <RNText allowFontScaling={false} {...props} style={[styles.text, style]} />
  );

  return onPress ? (
    <Touchable {...{ onPress, hitSlop, throttle }} style={styles.touchable}>
      <TextComponent />
    </Touchable>
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
    touchable: {
      flexWrap: 'wrap',
    },
  });

export default Text;
