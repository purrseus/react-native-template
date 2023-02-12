import { DEFAULT_ICON_SIZE, HORIZONTAL_GRADIENT_COORDINATES } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { alphaHexColor, compareMemo } from '@utilities';
import {
  ColorValue,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon, { IconProps } from '../Image/Icon';
import ActivityIndicator from '../Loader/ActivityIndicator';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import Touchable, { TouchableProps } from './Touchable';

type SizeName = 'small' | 'medium' | 'large';
type ButtonType = 'filled' | 'outlined' | 'tonal';
type ButtonSize = number;
type TitleSize = number;

interface ButtonProps extends TouchableProps {
  title: string;
  size?: SizeName;
  type?: ButtonType;
  gradient?: boolean;
  gradientColors?: ColorValue[];
  color?: ColorValue;
  titleCenter?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  iconLeft?: ImageRequireSource;
  iconRight?: ImageRequireSource;
  iconSpacing?: number;
  iconSize?: number | [number, number];
  iconProps?: Partial<IconProps>;
}

const sizes: Record<SizeName, [ButtonSize, TitleSize]> = {
  small: [36, 14],
  medium: [46, 16],
  large: [52, 16],
};

const Button = compareMemo<ButtonProps>(
  ({
    type = 'filled',
    size = 'medium',
    color,
    style,
    title,
    gradient = false,
    gradientColors,
    titleCenter = true,
    titleStyle,
    loading = false,
    iconLeft,
    iconRight,
    iconSpacing = 0,
    iconSize,
    iconProps,
    disabled,
    ...props
  }) => {
    const [buttonSize, titleSize] = sizes[size];
    const hasLeftIcon = typeof iconLeft === 'number';
    const hasRightIcon = typeof iconRight === 'number';
    const [leftIconSize, rightIconSize]: number[] = Array.isArray(iconSize)
      ? iconSize
      : new Array(2).fill(iconSize || DEFAULT_ICON_SIZE);
    const styles = useStyle(createStyles(color));
    const colorStyle = styles[`${disabled ? 'disabled' : type}Color`];

    const ButtonContent = (
      <>
        {hasLeftIcon ? (
          <Icon
            source={iconLeft}
            size={leftIconSize}
            {...iconProps}
            style={[styles.icon('left', iconSpacing, colorStyle.color), iconProps?.style]}
          />
        ) : hasRightIcon && titleCenter ? (
          <Spacer w={rightIconSize + iconSpacing} />
        ) : null}

        <Text numberOfLines={1} style={[styles.title(titleSize), colorStyle, titleStyle]}>
          {title}
        </Text>

        {hasRightIcon ? (
          <Icon
            source={iconRight}
            size={rightIconSize}
            {...iconProps}
            style={[styles.icon('right', iconSpacing, colorStyle.color), iconProps?.style]}
          />
        ) : hasLeftIcon && titleCenter ? (
          <Spacer w={leftIconSize + iconSpacing} />
        ) : null}
      </>
    );

    return (
      <Touchable
        {...props}
        disabled={loading || disabled}
        style={[styles.container(buttonSize), styles[type], !!disabled && styles.disabled, style]}
      >
        {gradient && (
          <LinearGradient
            colors={gradientColors || Object.values(styles.gradient)}
            {...HORIZONTAL_GRADIENT_COORDINATES}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? <ActivityIndicator color={colorStyle.color} /> : ButtonContent}
      </Touchable>
    );
  },
);

const createStyles =
  (customColor?: ColorValue) =>
  ({ create, colors }: StyleCallbackParams) =>
    create({
      container: (buttonSize: number) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: 16,
        height: buttonSize,
      }),
      gradient: [colors.primary, colors.blue] as ViewStyle,
      filled: {
        backgroundColor: customColor || colors.primary,
      },
      outlined: {
        backgroundColor: colors.white,
        borderColor: customColor || colors.primary,
        borderWidth: 1,
      },
      tonal: {
        backgroundColor: customColor || alphaHexColor(colors.primary, 0.2),
      },
      disabled: {
        backgroundColor: colors.lightGray,
      },
      filledColor: {
        color: colors.white,
      },
      outlinedColor: {
        color: customColor || colors.primary,
      },
      tonalColor: {
        color: customColor || colors.primary,
      },
      disabledColor: {
        color: colors.darkGray,
      },
      title: (titleSize: number) => ({
        fontSize: titleSize,
        fontWeight: 'bold',
        maxWidth: '80%',
      }),
      icon: (direction: 'left' | 'right', iconSpacing: number, tintColor: ColorValue) => ({
        [direction === 'left' ? 'marginLeft' : 'marginRight']: iconSpacing,
        tintColor,
      }),
    });

export default Button;
