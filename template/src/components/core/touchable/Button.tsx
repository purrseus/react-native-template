import { HORIZONTAL_GRADIENT_COORDINATES } from '@/core/constants';
import { useTailwind } from '@/hooks';
import { FC, useMemo } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { Style } from 'twrnc/dist/esm/types';
import ActivityIndicator from '../loader/ActivityIndicator';
import Text from '../text/Text';
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
  gradientColors?: string[];
  color?: string;
  centerTitle?: boolean;
  titleStyle?: Style;
  style?: Style;
  loading?: boolean;
  LeftIcon?: FC<SvgProps>;
  RightIcon?: FC<SvgProps>;
}

const sizes: Record<SizeName, [ButtonSize, TitleSize]> = {
  small: [36, 14],
  medium: [46, 16],
  large: [52, 16],
};

export default function Button({
  type = 'filled',
  size = 'medium',
  color,
  style,
  title,
  gradient = false,
  gradientColors,
  centerTitle = true,
  titleStyle,
  loading,
  LeftIcon,
  RightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const tw = useTailwind();
  const [buttonSize, titleSize] = sizes[size];

  const [typeStyle, contentTypeColor] = useMemo(() => {
    const typeStyles: Record<ButtonType | 'disabled', Style> = {
      filled: tw.style(color ? `bg-[${color}]` : 'bg-emerald-500'),
      outlined: tw.style('bg-transparent border border-emerald-500', !!color && `bg-[${color}]`),
      tonal: tw.style(color ? `bg-[${color}]` : 'bg-emerald-500/20'),
      disabled: tw`bg-zinc-300`,
    };

    const contentTypeColors: Record<ButtonType | 'disabled', string | undefined> = {
      filled: tw.color('white'),
      outlined: color || tw.color('emerald-500'),
      tonal: color || tw.color('emerald-500'),
      disabled: tw.color('zinc-400'),
    };

    return [
      typeStyles[`${disabled ? 'disabled' : type}`],
      contentTypeColors[`${disabled ? 'disabled' : type}`],
    ];
  }, [color, disabled, tw, type]);

  const LeftIconComponent = useMemo(
    () => (LeftIcon ? <LeftIcon stroke={contentTypeColor} /> : null),
    [LeftIcon, contentTypeColor],
  );

  const RightIconComponent = useMemo(
    () => (RightIcon ? <RightIcon stroke={contentTypeColor} /> : null),
    [RightIcon, contentTypeColor],
  );

  const LeftCounterWeight = useMemo(
    () =>
      !!RightIcon && centerTitle ? <View style={tw`opacity-0`}>{RightIconComponent}</View> : null,
    [RightIcon, RightIconComponent, centerTitle, tw],
  );

  const RightCounterWeight = useMemo(
    () =>
      !!LeftIcon && centerTitle ? <View style={tw`opacity-0`}>{LeftIconComponent}</View> : null,
    [LeftIcon, LeftIconComponent, centerTitle, tw],
  );

  return (
    <Touchable
      {...props}
      disabled={loading || disabled}
      style={tw.style(
        `flex-row flex-center rounded-xl overflow-hidden px-4 h-[${buttonSize}px]`,
        typeStyle,
        style,
      )}
    >
      {gradient && (
        <LinearGradient
          colors={gradientColors || ([tw.color('emerald-500'), tw.color('blue-500')] as string[])}
          {...HORIZONTAL_GRADIENT_COORDINATES}
          style={tw`abs-fill`}
        />
      )}

      {loading ? (
        <ActivityIndicator color={contentTypeColor} />
      ) : (
        <>
          {LeftIconComponent || LeftCounterWeight}
          <Text
            numberOfLines={1}
            style={tw.style(
              `font-bold max-w-[80%] mx-2 text-[${titleSize}px] text-[${contentTypeColor}]`,
              titleStyle,
            )}
          >
            {title}
          </Text>
          {RightIconComponent || RightCounterWeight}
        </>
      )}
    </Touchable>
  );
}
