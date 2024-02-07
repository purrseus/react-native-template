import { OverlayLoadingMethods } from '@/core/interfaces';
import {
  ComponentProps,
  ComponentType,
  JSXElementConstructor,
  PropsWithChildren,
  createRef,
  memo,
} from 'react';
import isEqual from 'react-fast-compare';

//#region buildProvidersTree
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Providers = readonly JSXElementConstructor<any>[];

type ProviderWithProps<A extends Providers> = {
  [K in keyof A]: ComponentProps<A[K]> extends never
    ? readonly [A[K]]
    : readonly [A[K]] | readonly [A[K], Omit<ComponentProps<A[K]>, 'children'>];
} & Pick<A, 'length'>;

export function buildProvidersTree<A extends Providers>(providerWithProps: ProviderWithProps<A>) {
  return ({ children }: PropsWithChildren) =>
    providerWithProps.reduceRight(
      (inner, [Provider, props = {}]) => <Provider {...props}>{inner}</Provider>,
      children,
    );
}
//#endregion

export const overlayLoadingRef = createRef<OverlayLoadingMethods>();

export const overlayLoading = {
  show: () => overlayLoadingRef.current?.show(true),
  hide: () => overlayLoadingRef.current?.show(false),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareMemo = <T extends ComponentType<any>>(Component: T) => memo(Component, isEqual);
