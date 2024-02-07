import { RootStackParamList } from '@/core/types';
import {
  NavigationHelpers,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type ActionName = keyof typeof StackActions;
type ActionType<T extends ActionName> = (...args: Parameters<(typeof StackActions)[T]>) => void;

interface Navigation<T extends RootStackParamList>
  extends Pick<NavigationHelpers<T>, 'goBack' | 'reset' | 'dispatch'> {
  ready(callback: () => void): void;

  navigate<RouteName extends keyof T>(
    ...args: RouteName extends unknown
      ? undefined extends T[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: T[RouteName]]
        : [screen: RouteName, params: T[RouteName]]
      : never
  ): void;

  replace: ActionType<'replace'>;
  push: ActionType<'push'>;
  pop: ActionType<'pop'>;
  popToTop: ActionType<'popToTop'>;
}

export const rootNavigation: Navigation<RootStackParamList> = {
  ready(callback) {
    if (navigationRef.isReady()) callback();
  },
  dispatch(action) {
    this.ready(() => navigationRef.dispatch(action));
  },
  navigate(...args) {
    this.ready(() => navigationRef.navigate(...args));
  },
  goBack() {
    this.ready(() => {
      if (navigationRef.canGoBack()) navigationRef.goBack();
    });
  },
  reset(...params) {
    this.ready(() => navigationRef.reset(...params));
  },
  replace(name, params) {
    this.dispatch(StackActions.replace(name, params));
  },
  push(name, params) {
    this.dispatch(StackActions.push(name, params));
  },
  pop(count) {
    this.dispatch(StackActions.pop(count));
  },
  popToTop() {
    this.dispatch(StackActions.popToTop());
  },
};
