/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { DependencyList, useEffect, useRef } from 'react';

type FocusCallback = (param: { isFocused: boolean; isFirstRender: boolean }) => void;

const useAppFocus = (focusCallback: FocusCallback, deps: DependencyList) => {
  const isFocused = useIsFocused();
  const isFirstRender = useRef(true);

  useEffect(() => {
    focusCallback({ isFocused, isFirstRender: isFirstRender.current });
    if (isFirstRender.current) isFirstRender.current = false;
  }, deps.concat([isFocused]));
};

export default useAppFocus;
