import { LanguageMap, Locale } from '@/core/types';
import { Insets } from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { Edge } from 'react-native-safe-area-context';

export const ONE_SECOND = 1000;
export const HORIZONTAL_SAFETY_EDGES: ReadonlyArray<Edge> = ['left', 'right'];

//#region sizes
export const APP_BAR_HEIGHT = 50;
export const DEFAULT_FONT_SIZE = 14;
export const MIN_HEIGHT_INPUT = DEFAULT_FONT_SIZE + 6;
export const MAX_HEIGHT_INPUT = 220;
export const PADDING_VERTICAL_INPUT = 12;
export const DEFAULT_HORIZONTAL_EDGE_SPACING = 16;
export const DEFAULT_HIT_SLOP: Readonly<Insets> = { top: 8, bottom: 8, left: 8, right: 8 };
//#endregion

//#region styles
export const DEFAULT_BACKDROP_OPACITY = 0.2;
export const HORIZONTAL_GRADIENT_COORDINATES: Readonly<
  Required<Pick<LinearGradientProps, 'start' | 'end'>>
> = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};
//#endregion

//#region i18n
export const DEFAULT_NAMESPACE = 'translation';
export const LANGUAGE_MAP: Readonly<LanguageMap<Locale>> = {
  'en-US': 'en-gb',
  'vi-VN': 'vi',
};
//#endregion
