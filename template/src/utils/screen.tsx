type Props<T> = T extends undefined ? {} : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withHook<H extends (...args: any[]) => any>(
  hook: H,
  Screen: (props: ReturnType<H>) => JSX.Element,
) {
  return (props: Props<Parameters<H>[0]>) => <Screen {...hook(props)} />;
}
