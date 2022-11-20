/* eslint-disable react-native/split-platform-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonSize } from '@core/types';
import { colors } from '@themes';
import { ShadowStyleIOS, ViewStyle } from 'react-native';

//#region shadowGenerator
type Depth<D extends number, A extends any[] = [[]]> = A['length'] extends D
  ? A['length']
  : A['length'] | Depth<D, [...A, []]>;

const MAX_DEPTH = 24;
const MIN_SHADOW_OPACITY = 0.2;
const MAX_SHADOW_OPACITY = 0.6;
const MAX_SHADOW_RADIUS = 16;

const SHADOW_OPACITY_PER_DEPTH = (MAX_SHADOW_OPACITY * 100 - MIN_SHADOW_OPACITY * 100) / MAX_DEPTH;
const SHADOW_RADIUS_PER_DEPTH = MAX_SHADOW_RADIUS / MAX_DEPTH;

export const shadowGenerator = (depth: Depth<typeof MAX_DEPTH>, shadowColor = colors.black) => ({
  shadowColor,
  shadowOffset: {
    width: 0,
    height: depth ? Math.floor(depth / 2) : 0,
  },
  shadowOpacity:
    Math.ceil((depth ? MIN_SHADOW_OPACITY : 0) * 100 + SHADOW_OPACITY_PER_DEPTH * depth) / 100,
  shadowRadius: SHADOW_RADIUS_PER_DEPTH * depth,
  elevation: depth,
});
//#endregion

export const randomColor = () => `#${Math.random().toString(16).slice(-6)}`;

export const alphaHexColor = (hexColor: string, opacity: number) => {
  const MIN_OPACITY = 0.066;
  // Limit the opacity from 0 to 1
  const opacityRange = Math.min(Math.max(opacity, 0), 1);
  const safeOpacityValue =
    opacityRange > 0 && opacityRange < MIN_OPACITY ? MIN_OPACITY : opacityRange;
  const alpha = `${(safeOpacityValue * 255).toString(16)}0`.slice(0, 2);

  return `${hexColor}${alpha}`;
};

export const createShadow = (
  shadowColor = 'transparent',
  [shadowOffsetWidth, shadowOffsetHeight] = [0, 0],
  shadowOpacity = 0,
  shadowRadius = 0,
  elevation = 0,
): Required<ShadowStyleIOS & Pick<ViewStyle, 'elevation'>> => ({
  shadowColor,
  shadowOffset: { width: shadowOffsetWidth, height: shadowOffsetHeight },
  shadowOpacity,
  shadowRadius,
  elevation,
});

export const resizeImage = (
  sizeType: 'width' | 'height',
  expectSize: number,
  currentWidth: number,
  currentHeight: number,
): CommonSize => {
  if (!expectSize) return { width: 0, height: 0 };
  const dimensionTarget = (sizeType === 'width' ? currentWidth : currentHeight) || 1;
  const scale = expectSize / dimensionTarget;
  return { width: currentWidth * scale, height: currentHeight * scale };
};
