/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const INACTIVE_REGEX = /inactive|background/;

const useAppState = (callback: (isActive: boolean) => void, deps: DependencyList = []) => {
  const currentAppState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (currentAppState.current.match(INACTIVE_REGEX) && nextAppState === 'active')
        callback(true);

      if (nextAppState.match(INACTIVE_REGEX)) callback(false);

      currentAppState.current = nextAppState;
    });

    return () => subscription.remove();
  }, deps);
};

export default useAppState;
