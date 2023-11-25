/* eslint-disable @typescript-eslint/no-explicit-any */
type Props<T> = T extends undefined ? {} : T;

export function withHook<H extends (...args: any[]) => any>(
  hook: H,
  Screen: (props: ReturnType<H>) => JSX.Element,
) {
  return (props: Props<Parameters<H>[0]>) => <Screen {...hook(props)} />;
}
