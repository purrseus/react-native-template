/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { debounce } from 'lodash';
import { DependencyList, useCallback } from 'react';

const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList = [],
  wait = ONE_SECOND,
) => useCallback(debounce<T>(callback, wait), deps);

export default useDebounce;
