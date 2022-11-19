/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxItem, CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { createField } from '@utilities';
import { ForwardRefRenderFunction, useCallback } from 'react';
import { StyleProp, Text, View, ViewProps, ViewStyle } from 'react-native';
import Checkbox from '../Pressable/Checkbox';

export interface CheckboxesProps<T = any>
  extends Omit<ViewProps, 'style'>,
    Omit<CommonFieldProps<T[]>, 'onChangeText'> {
  data: CheckboxItem<T>[];
  containerStyle?: StyleProp<ViewStyle>;
  checkboxesStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}

const _Checkboxes: ForwardRefRenderFunction<unknown, CheckboxesProps> = ({
  label,
  data,
  value = [],
  onChange,
  containerStyle,
  checkboxesStyle,
  itemStyle,
  errorText,
  ...props
}) => {
  const styles = useStyle(createStyles);

  const onPress = useCallback(
    (itemValue: CheckboxItem['value']) => () => {
      const isChecked = value.includes(itemValue);
      const currentValue = isChecked ? value.filter(v => v !== itemValue) : [...value, itemValue];
      onChange?.(currentValue);
    },
    [onChange, value],
  );

  return (
    <View {...props} style={containerStyle}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.checkboxes, checkboxesStyle]}>
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

      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    checkboxes: {
      flexDirection: 'row',
    },
    errorText: {
      color: colors.red,
      marginTop: 4,
    },
  });

const Checkboxes = createField(_Checkboxes) as <T = any>(props: CheckboxesProps<T>) => JSX.Element;

export default Checkboxes;
