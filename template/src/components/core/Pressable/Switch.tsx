import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo, createShadow, isAndroid as isAndroidOS } from '@utilities';
import { ReactNode, useLayoutEffect } from 'react';
import {
  ActivityIndicatorProps,
  ColorValue,
  Platform,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ActivityIndicator from '../Loader/ActivityIndicator';
import PressArea from './PressArea';

interface SwitchProps extends ViewProps {
  isEnabled: boolean;
  onPress: (value: boolean) => void;
  disabled?: boolean;
  ActiveIcon?: ReactNode;
  /** @platform android */
  thumbScaleAnimated?: boolean;
  loading?: boolean;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = TRACK_HEIGHT;
const INPUT_RANGE: ReadonlyArray<number> = [0, 1];

const AnimatedPressArea = Animated.createAnimatedComponent(PressArea);

const Switch = compareMemo<SwitchProps>(
  ({
    isEnabled,
    onPress,
    disabled = false,
    ActiveIcon,
    thumbScaleAnimated = true,
    loading = false,
    style,
    ...props
  }) => {
    const styles = useStyle(createStyles);
    const isAndroid = isAndroidOS();
    const [trackActiveColor, trackInactiveColor] = styles.trackColor as (string | number)[];
    const [thumbActiveColor, thumbInactiveColor] = styles.thumbColor as (string | number)[];
    const statusAnimated = useSharedValue(+isEnabled);

    const trackAnimatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(statusAnimated.value, INPUT_RANGE, [
        trackInactiveColor,
        disabled ? trackInactiveColor : trackActiveColor,
      ]);

      return { backgroundColor: backgroundColor as ColorValue };
    }, [disabled]);

    const thumbAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(statusAnimated.value, INPUT_RANGE, [
        0,
        TRACK_WIDTH - THUMB_SIZE,
      ]);
      const backgroundColor = interpolateColor(statusAnimated.value, INPUT_RANGE, [
        thumbInactiveColor,
        disabled ? thumbInactiveColor : thumbActiveColor,
      ]);
      const scale = interpolate(statusAnimated.value, INPUT_RANGE, [2 / 3, 1]);

      return {
        transform: [{ translateX }, { scale: thumbScaleAnimated && isAndroid ? scale : 1 }],
        backgroundColor: backgroundColor as ColorValue,
      };
    }, [disabled, isEnabled]);

    const handleChangeValue = () => onPress(!isEnabled);

    useLayoutEffect(() => {
      statusAnimated.value = withTiming(+isEnabled);
    }, [isEnabled, statusAnimated]);

    return (
      <View {...props} style={[styles.container, style]}>
        <AnimatedPressArea
          onPress={handleChangeValue}
          disabled={disabled || loading}
          style={[styles.track, trackAnimatedStyle]}
        >
          <View style={styles.thumbWrapper}>
            <Animated.View style={[styles.thumb, thumbAnimatedStyle]}>
              {loading ? (
                <ActivityIndicator
                  color={(isEnabled ? thumbInactiveColor : thumbActiveColor) as ColorValue}
                  size={Platform.select<ActivityIndicatorProps['size']>({
                    android: THUMB_SIZE - 16,
                    ios: 'small',
                  })}
                />
              ) : (
                ActiveIcon
              )}
            </Animated.View>
          </View>
        </AnimatedPressArea>
      </View>
    );
  },
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    track: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      justifyContent: 'center',
    },
    trackColor: [colors.primary, colors.switchTrackInactive] as ViewStyle,
    thumbColor: [colors.white, colors.darkGray] as ViewStyle,
    thumbWrapper: {
      padding: 4,
      width: THUMB_SIZE,
      height: THUMB_SIZE,
    },
    thumb: {
      ...globalStyles.flexFillCenter,
      borderRadius: 100,
      ...createShadow(colors.shadow, [0, 4], 0.4, 4, 8),
    },
  });

export default Switch;
