/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

type FocusCallback = (param: {
  isFocused: boolean;
  isFirstRender: boolean;
}) => ReturnType<EffectCallback>;

const useAppFocus = (focusCallback: FocusCallback, deps: DependencyList) => {
  const isFocused = useIsFocused();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const unsubscribe = focusCallback({
      isFocused,
      isFirstRender: isFirstRender.current ? ((isFirstRender.current = false), true) : false,
    });

    return unsubscribe;
  }, deps.concat([isFocused]));
};

export default useAppFocus;
