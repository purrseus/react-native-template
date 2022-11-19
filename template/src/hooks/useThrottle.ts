/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_THROTTLE_SETTINGS, ONE_SECOND } from '@core/constants';
import { throttle } from 'lodash';
import { DependencyList, useCallback } from 'react';

const useThrottle = <T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList = [],
  wait = ONE_SECOND,
  throttleSettings = DEFAULT_THROTTLE_SETTINGS,
) => useCallback(throttle<T>(callback, wait, throttleSettings), deps);

export default useThrottle;
