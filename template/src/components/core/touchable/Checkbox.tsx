import { Tick } from '@/assets/icons';
import { CheckboxItem } from '@/core/interfaces';
import { useTailwind } from '@/hooks';
import { View, ViewProps } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import Text from '../text/Text';
import Touchable from './Touchable';

interface CheckboxProps extends Omit<CheckboxItem, 'value'>, Omit<ViewProps, 'style'> {
  isActive?: boolean;
  onPress: () => void;
  containerStyle?: Style;
}

export default function Checkbox({
  label,
  isActive = false,
  onPress,
  disabled = false,
  containerStyle,
  ...props
}: CheckboxProps) {
  const tw = useTailwind();

  return (
    <View {...props} style={tw.style('flex-row items-center gap-x-2', containerStyle)}>
      <Touchable
        hitSlop={8}
        style={tw.style('rounded-md border w-5 h-5 flex-center', {
          'border-zinc-300': disabled && !isActive,
          'bg-zinc-300 border-transparent': disabled && isActive,
          'border-zinc-700 dark:border-white': !disabled && !isActive,
          'bg-emerald-500 border-transparent': !disabled && isActive,
        })}
        {...{ disabled, onPress }}
      >
        <Tick stroke={tw.color('white')} width={10} height={10} opacity={+!!isActive} />
      </Touchable>

      <Text style={tw`${disabled ? 'text-zinc-300' : 'text-zinc-700 dark:text-white'}`}>
        {label}
      </Text>
    </View>
  );
}
