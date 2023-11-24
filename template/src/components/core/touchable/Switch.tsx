import { useTailwind } from '@/hooks';
import { ReactNode, useLayoutEffect } from 'react';
import { ColorValue, View, ViewProps } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Style } from 'twrnc/dist/esm/types';
import ActivityIndicator from '../loader/ActivityIndicator';
import Touchable from './Touchable';

interface SwitchProps extends ViewProps {
  isEnabled: boolean;
  onPress: (value: boolean) => void;
  disabled?: boolean;
  ActiveIcon?: ReactNode;
  /** @platform android */
  thumbScaleAnimated?: boolean;
  loading?: boolean;
  style?: Style;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = TRACK_HEIGHT;
const INPUT_RANGE: ReadonlyArray<number> = [0, 1];

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

export default function Switch({
  isEnabled,
  onPress,
  disabled = false,
  ActiveIcon,
  thumbScaleAnimated = true,
  loading = false,
  style,
  ...props
}: SwitchProps) {
  const tw = useTailwind();
  const isAndroidPlatform = isAndroid();

  const [trackActiveColor, trackInactiveColor] = [tw.color('emerald-500')!, tw.color('zinc-300')!];
  const [thumbActiveColor, thumbInactiveColor] = [tw.color('white')!, tw.color('zinc-400')!];

  const statusAnimated = useSharedValue(+isEnabled);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(statusAnimated.value, INPUT_RANGE, [
      trackInactiveColor,
      disabled ? trackInactiveColor : trackActiveColor,
    ]);

    return { backgroundColor: backgroundColor };
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
      transform: [{ translateX }, { scale: thumbScaleAnimated && isAndroidPlatform ? scale : 1 }],
      backgroundColor: backgroundColor as ColorValue,
    };
  }, [disabled, isEnabled]);

  const handleChangeValue = () => onPress(!isEnabled);

  useLayoutEffect(() => {
    statusAnimated.value = withTiming(+isEnabled);
  }, [isEnabled, statusAnimated]);

  return (
    <View
      {...props}
      style={tw.style(`w-[${TRACK_WIDTH}px] h-[${TRACK_HEIGHT}px] flex-center`, style)}
    >
      <AnimatedTouchable
        onPress={handleChangeValue}
        disabled={disabled || loading}
        style={[
          tw.style(
            `w-[${TRACK_WIDTH}px] h-[${TRACK_HEIGHT}px] rounded-[${
              TRACK_HEIGHT / 2
            }px] justify-center`,
          ),
          trackAnimatedStyle,
        ]}
      >
        <View style={tw`w-[${THUMB_SIZE}px] h-[${THUMB_SIZE}px] p-1`}>
          <Animated.View
            style={[
              tw.style(
                'flex-fill-center rounded-full shadow-black dark:shadow-zinc-200 shadow-offset-[0px]/[4px] shadow-opacity-40 shadow-radius-4 elevation-8',
              ),
              thumbAnimatedStyle,
            ]}
          >
            {loading ? (
              <ActivityIndicator
                color={isEnabled ? thumbInactiveColor : thumbActiveColor}
                size={isAndroidPlatform ? THUMB_SIZE - 16 : 'small'}
              />
            ) : (
              ActiveIcon
            )}
          </Animated.View>
        </View>
      </AnimatedTouchable>
    </View>
  );
}
