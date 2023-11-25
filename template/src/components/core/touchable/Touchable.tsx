import { useThrottle } from '@/hooks';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

export interface TouchableProps extends PressableProps {
  throttle?: number;
  hitSlop?: number;
  pressInStyle?: Style;
  style?: Style;
}

function Touchable(
  { throttle = duration({ s: 0.5 }), onPress, pressInStyle, style, ...props }: TouchableProps,
  ref: ForwardedRef<View>,
) {
  const handleOnPress = useThrottle(onPress || (() => null), [onPress], throttle);

  const handleStateStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [style, pressed && pressInStyle],
    [style, pressInStyle],
  );

  return (
    <Pressable
      {...props}
      ref={ref}
      android_disableSound={true}
      android_ripple={null}
      pressRetentionOffset={(props.hitSlop || 0) * 2}
      onPress={throttle ? handleOnPress : onPress}
      style={handleStateStyle}
    />
  );
}

export default forwardRef(Touchable);
