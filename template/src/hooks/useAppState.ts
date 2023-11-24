/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const INACTIVE_REGEX = /inactive|background/;

const useAppState = (
  callback: (isActive: boolean) => ReturnType<EffectCallback>,
  deps: DependencyList = [],
) => {
  const currentAppState = useRef(AppState.currentState);

  useEffect(() => {
    let callbackSubscription: ReturnType<EffectCallback>;
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (currentAppState.current.match(INACTIVE_REGEX) && nextAppState === 'active')
        callbackSubscription = callback(true);

      if (nextAppState.match(INACTIVE_REGEX)) callbackSubscription = callback(false);

      currentAppState.current = nextAppState;
    });

    return () => {
      callbackSubscription?.();
      subscription.remove();
    };
  }, deps);
};

export default useAppState;
