/* eslint-disable @typescript-eslint/no-explicit-any */
import { icons } from '@assets';
import { CheckboxItem, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Icon from '../Image/Icon';
import Row from '../Layout/Row';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import PressArea from './PressArea';

interface CheckboxProps<T = any> extends Omit<CheckboxItem<T>, 'value'>, Omit<ViewProps, 'style'> {
  isActive?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const _Checkbox = ({
  label,
  isActive,
  onPress,
  disabled,
  containerStyle,
  ...props
}: CheckboxProps) => {
  const behaviorStyle = disabled ? 'Disabled' : 'Enabled';
  const stateStyle = isActive ? 'Active' : 'Inactive';
  const styles = useStyle(createStyles);

  return (
    <Row {...props} style={[styles.container, containerStyle]}>
      <PressArea
        hitSlop={8}
        style={[styles.checkbox, styles[`checkbox${behaviorStyle}${stateStyle}`]]}
        {...{ disabled, onPress }}
      >
        <Icon source={icons.checkbox.tick} size={20} style={styles.tick(isActive)} />
      </PressArea>
      <Spacer w={6} />
      <Text style={styles[`label${behaviorStyle}`]}>{label}</Text>
    </Row>
  );
};

const createStyles = ({ colors, create }: StyleCallbackParams) =>
  create({
    container: {
      alignItems: 'center',
    },
    checkbox: {
      borderRadius: 6,
      borderWidth: 1,
    },
    checkboxEnabledInactive: {
      borderColor: colors.primaryText,
    },
    checkboxEnabledActive: {
      backgroundColor: colors.primary,
      borderColor: colors.transparent,
    },
    checkboxDisabledInactive: {
      borderColor: colors.lightGray,
    },
    checkboxDisabledActive: {
      backgroundColor: colors.lightGray,
      borderColor: colors.transparent,
    },
    tick: (isActive?: boolean) => ({
      transform: [{ scale: 1.4 }],
      opacity: +!!isActive,
      tintColor: colors.white,
    }),
    labelEnabled: {
      color: colors.primaryText,
    },
    labelDisabled: {
      color: colors.lightGray,
    },
  });

const Checkbox = compareMemo<CheckboxProps>(_Checkbox) as <T = any>(
  props: CheckboxProps<T>,
) => JSX.Element;

export default Checkbox;
