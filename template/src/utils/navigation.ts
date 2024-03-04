import { RootStackParamList } from '@/core/types';
import {
  NavigationHelpers,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export namespace NavigationService {
  type NavigationHelperFns = NavigationHelpers<RootStackParamList>;
  type HelperFn<Name extends keyof NavigationHelperFns> = NavigationHelperFns[Name];
  type ActionName = keyof typeof StackActions;
  type ActionFn<T extends ActionName> = (...args: Parameters<(typeof StackActions)[T]>) => void;

  export const ref = createNavigationContainerRef<RootStackParamList>();

  const ready = (callback: () => void) => {
    if (ref.isReady()) callback();
  };

  const dispatch: HelperFn<'dispatch'> = action => ready(() => ref.dispatch(action));

  export const navigate = <RouteName extends keyof RootStackParamList>(
    ...args: Parameters<typeof ref.navigate<RouteName>>
  ) => ready(() => ref.navigate<RouteName>(...args));

  export const goBack: HelperFn<'goBack'> = () =>
    ready(() => {
      if (ref.canGoBack()) ref.goBack();
    });

  export const reset: HelperFn<'reset'> = (...params) => ready(() => ref.reset(...params));

  export const replace: ActionFn<'replace'> = (...args) => dispatch(StackActions.replace(...args));

  export const push: ActionFn<'push'> = (...args) => dispatch(StackActions.push(...args));

  export const pop: ActionFn<'pop'> = (...args) => dispatch(StackActions.pop(...args));

  export const popToTop: ActionFn<'popToTop'> = () => dispatch(StackActions.popToTop());
}
