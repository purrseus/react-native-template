import { StyleCallbackParams } from '@core/interfaces';
import { CommonSize } from '@core/types';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import {
  AccessibilityProps,
  Image as RNImage,
  ImageLoadEventData,
  ImageProps as RNImageProps,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  ViewProps,
} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle as FastImageStyle,
  OnLoadEvent,
} from 'react-native-fast-image';

type MixinImagePropKeys =
  | 'source'
  | 'resizeMode'
  | 'onLoadStart'
  | 'onLoad'
  | 'onError'
  | 'onLoadEnd'
  | 'style';

type CachedImagePropKeys = 'fallback' | 'tintColor';

type ImageTypeProps<C, Key extends keyof FastImageProps & keyof RNImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : RNImageProps[K];
};

type CachedImageProps<C, Key extends keyof FastImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : undefined;
};

type MixinImageProps<C> = Partial<
  ImageTypeProps<C, MixinImagePropKeys> & CachedImageProps<C, CachedImagePropKeys>
> &
  ImageTypeProps<C, 'source'>;

interface CommonImageProps<C extends boolean>
  extends Omit<RNImageProps, keyof FastImageProps>,
    AccessibilityProps,
    ViewProps {
  cached?: C;
}

export type ImageProps<C extends boolean = false> = CommonImageProps<C> & MixinImageProps<C>;

const _Image = ({ style, cached, onLoad, ...props }: ImageProps) => {
  const styles = useStyle(createStyles);
  const [size, setSize] = useState<CommonSize>({ width: 0, height: 0 });
  const imageStyle = styles[!!size.width && !!size.height ? 'image' : 'progressImage'];

  const _onLoad = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<ImageLoadEventData> | OnLoadEvent) => {
      onLoad?.({ nativeEvent } as Parameters<NonNullable<ImageProps['onLoad']>>[0]);

      if (!!size.width && !!size.height) return;
      setSize('source' in nativeEvent ? omit(nativeEvent.source, ['uri']) : nativeEvent);
    },
    [size.width, size.height, onLoad],
  );

  return cached ? (
    <FastImage
      {...(props as FastImageProps)}
      onLoad={_onLoad}
      style={[imageStyle, style as StyleProp<FastImageStyle>]}
    />
  ) : (
    <RNImage
      {...(props as RNImageProps)}
      onLoad={_onLoad}
      progressiveRenderingEnabled
      style={[imageStyle, style as StyleProp<ImageStyle>]}
    />
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    progressImage: {
      backgroundColor: colors.backgroundImage,
    },
    image: {
      backgroundColor: colors.transparent,
    },
  });

const Image = compareMemo<ImageProps>(_Image) as <T extends boolean = false>(
  props: ImageProps<T>,
) => JSX.Element;

export default Image;
