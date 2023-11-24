/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@/core/constants';
import { throttle } from 'lodash';
import { DependencyList, useCallback } from 'react';

const useThrottle = <T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList = [],
  wait = ONE_SECOND,
) =>
  useCallback(
    throttle<T>(callback, wait, {
      leading: true,
      trailing: false,
    }),
    deps,
  );

export default useThrottle;
