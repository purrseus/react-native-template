import { RootStackParamList } from '@/core/types';
import { Falsy, RecursiveArray, RegisteredStyle } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactNode,
  ): (props: PropsWithoutRef<P> & RefAttributes<T>) => ReactNode;
}

declare module 'react-native' {
  type StyleProp<T> =
    | T
    | RegisteredStyle<T>
    | RecursiveArray<T | RegisteredStyle<T> | Falsy>
    | Falsy
    | Style;
}
