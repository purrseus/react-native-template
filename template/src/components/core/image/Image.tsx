import { useTailwind } from '@/hooks';
import { useCallback, useState } from 'react';
import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { Style } from 'twrnc/dist/esm/types';

type FactoryImageProps<C> = C extends true ? FastImageProps : RNImageProps;

export type ImageProps<C> = Omit<FactoryImageProps<C>, 'style'> & {
  cached?: C;
  style?: Style;
};

export default function Image<C extends boolean>({
  style,
  cached,
  onLoad,
  ...props
}: ImageProps<C>) {
  const tw = useTailwind();
  const [hasSizes, setHasSizes] = useState(false);
  const imageStyle = tw.style(hasSizes ? 'bg-transparent' : 'bg-zinc-300 dark:bg-zinc-700', style);

  const handleOnLoad = useCallback(
    ({ nativeEvent }: FirstParameter<NonNullable<typeof onLoad>>) => {
      // @ts-ignore
      onLoad?.({ nativeEvent });

      if (hasSizes) return;
      const source = 'source' in nativeEvent ? nativeEvent.source : nativeEvent;
      setHasSizes(!!source.width && !!source.height);
    },
    [hasSizes, onLoad],
  );

  if (cached)
    return (
      <FastImage {...(props as FactoryImageProps<true>)} onLoad={handleOnLoad} style={imageStyle} />
    );

  return (
    <RNImage
      {...(props as FactoryImageProps<false>)}
      progressiveRenderingEnabled
      onLoad={handleOnLoad}
      style={imageStyle}
    />
  );
}
