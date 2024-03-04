import {
  ComponentProps,
  ComponentType,
  JSXElementConstructor,
  PropsWithChildren,
  memo,
} from 'react';
import isEqual from 'react-fast-compare';

export namespace ProviderTree {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Components = readonly JSXElementConstructor<any>[];

  type ProviderWithProps<Providers extends Components> = Pick<Providers, 'length'> & {
    [Index in keyof Providers]: ComponentProps<Providers[Index]> extends never
      ? readonly [Providers[Index]]
      :
          | readonly [Providers[Index]]
          | readonly [Providers[Index], Omit<ComponentProps<Providers[Index]>, 'children'>];
  };

  export function build<Providers extends Components>(
    providerWithProps: ProviderWithProps<Providers>,
  ) {
    return ({ children }: PropsWithChildren) =>
      providerWithProps.reduceRight(
        (inner, [Provider, props = {}]) => <Provider {...props}>{inner}</Provider>,
        children,
      );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withHook<H extends (...args: readonly any[]) => any>(
  hook: H,
  Component: (props: ReturnType<H>) => JSX.Element,
) {
  return (props: NonNullable<FirstParameter<H> | {}>) => <Component {...hook(props)} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compareMemo<T extends ComponentType<any>>(Component: T) {
  return memo(Component, isEqual);
}
