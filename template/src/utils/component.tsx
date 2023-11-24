/* eslint-disable @typescript-eslint/no-explicit-any */
import { OverlayLoadingMethods } from '@/core/interfaces';
import { ComponentType, createRef, memo } from 'react';
import isEqual from 'react-fast-compare';

export const overlayLoadingRef = createRef<OverlayLoadingMethods>();

export const overlayLoading = {
  show: () => overlayLoadingRef.current?.show(true),
  hide: () => overlayLoadingRef.current?.show(false),
};

export const compareMemo = <T extends ComponentType<any>>(Component: T) => memo(Component, isEqual);
