import { ComponentProps, JSXElementConstructor, PropsWithChildren } from 'react';
import { DevSettings, UIManager } from 'react-native';
import { MMKVStorage } from './store';

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

//#region bootstrap
let bootstrapped = false;

export const onAppBootstrap = () => {
  if (bootstrapped) return;
  bootstrapped = true;

  if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);

  if (__DEV__) {
    const devSettingItems: { title: string; handler: () => void }[] = [
      {
        title: 'Clear MMKV Storage And Reload',
        handler: () => {
          MMKVStorage.clearAll();
          DevSettings.reload();
        },
      },
    ];

    devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
  }
};
//#endregion
