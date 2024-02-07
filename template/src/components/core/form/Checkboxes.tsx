import { CheckboxItem } from '@/core/interfaces';
import { FieldProps } from '@/core/types';
import { useTailwind } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import Checkbox from '../touchable/Checkbox';

export interface CheckboxesProps<T> extends Omit<ViewProps, 'style'> {
  data: CheckboxItem<T>[];
  containerStyle?: Style;
  checkboxStyle?: Style;
  itemStyle?: Style;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Checkboxes<T = any>({
  name,
  label,
  data,
  containerStyle,
  checkboxStyle,
  itemStyle,
  _fieldProps,
  ...props
}: FieldProps<CheckboxesProps<T>>) {
  const tw = useTailwind();
  const { field, fieldState } = _fieldProps!;
  const value = useMemo<T[]>(() => field.value || [], [field]);

  const onPress = useCallback(
    (itemValue: T) => () => {
      const isChecked = value.includes(itemValue);
      const currentValue = isChecked
        ? value.filter((v: T) => v !== itemValue)
        : [...value, itemValue];
      field.onChange(currentValue.isEmpty ? undefined : currentValue);
    },
    [field, value],
  );

  return (
    <View {...props} id={name} style={containerStyle}>
      {!!label && <Text style={tw`text-sm font-bold mb-1`}>{label}</Text>}

      <View style={tw.style('flex-row', checkboxStyle)}>
        {data.map(item => (
          <Checkbox
            key={item.label}
            {...item}
            onPress={onPress(item.value)}
            isActive={value.includes(item.value)}
            containerStyle={itemStyle}
          />
        ))}
      </View>

      {!!fieldState.error?.message && (
        <Text style={tw`text-red-600 mt-1`}>{fieldState.error.message}</Text>
      )}
    </View>
  );
}
