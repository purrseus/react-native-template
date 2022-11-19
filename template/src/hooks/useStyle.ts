/* eslint-disable react-hooks/exhaustive-deps */
import { StyleCallbackParams } from '@core/interfaces';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useColor from './useColor';

export type StyleCallback = (
  params: StyleCallbackParams,
) => ReturnType<StyleCallbackParams['create']>;

const useStyle = <T extends StyleCallback>(createStyles: T): ReturnType<T> => {
  const dimensions = useWindowDimensions();
  const colors = useColor();
  const edgeInsets = useSafeAreaInsets();

  return useMemo(
    () =>
      createStyles({
        dimensions,
        colors,
        edgeInsets,
        create: StyleSheet.create,
      }) as ReturnType<T>,
    [dimensions, edgeInsets, colors],
  );
};

export default useStyle;
