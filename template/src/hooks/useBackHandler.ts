/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect } from '@react-navigation/native';
import { DependencyList, useCallback } from 'react';
import { BackHandler, BackHandlerStatic } from 'react-native';

const useBackHandler = (
  onBackPress: (BackHandler: BackHandlerStatic) => boolean | null | undefined,
  deps: DependencyList,
) => {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () =>
        onBackPress(BackHandler),
      );

      return () => subscription.remove();
    }, deps),
  );
};

export default useBackHandler;
