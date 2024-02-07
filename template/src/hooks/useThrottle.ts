import { ONE_SECOND } from '@/core/constants';
import { throttle } from 'lodash';
import { DependencyList, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useThrottle = <T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList = [],
  wait = ONE_SECOND,
) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(
    throttle<T>(callback, wait, {
      leading: true,
      trailing: false,
    }),
    deps,
  );

export default useThrottle;
