import { DEFAULT_ICON_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import Image, { ImageProps } from './Image';

export interface IconProps extends ImageProps<false> {
  size?: number;
}

const Icon = compareMemo<IconProps>(({ size = DEFAULT_ICON_SIZE, style, ...props }) => {
  const styles = useStyle(createStyles);

  return <Image {...props} style={[styles.icon(size), style]} />;
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    icon: (size: number) => ({
      backgroundColor: colors.transparent,
      width: size,
      height: size,
      tintColor: colors.tintIcon,
    }),
  });

export default Icon;
