import Row from '@components/core/Layout/Row';
import Spacer from '@components/core/Spacer/Spacer';
import { PADDING_VERTICAL_INPUT } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { forwardRef, ReactNode } from 'react';
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import TextInput from './TextInput';

export interface IconTextInputProps extends RNTextInputProps {
  IconLeftComponent?: ReactNode;
  IconRightComponent?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const IconTextInput = compareMemo<RNTextInput, IconTextInputProps>(
  forwardRef(({ IconLeftComponent, IconRightComponent, containerStyle, style, ...props }, ref) => {
    const styles = useStyle(createStyles);

    const IconSpacer = <Spacer w={8} />;

    return (
      <Row style={[styles.container, containerStyle]}>
        {IconLeftComponent}
        {!!IconLeftComponent && IconSpacer}
        <TextInput {...props} ref={ref} style={[globalStyles.flexFill, style]} />
        {!!IconRightComponent && IconSpacer}
        {IconRightComponent}
      </Row>
    );
  }),
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: PADDING_VERTICAL_INPUT,
      backgroundColor: colors.lightGray,
      borderRadius: 12,
    },
  });

export default IconTextInput;
