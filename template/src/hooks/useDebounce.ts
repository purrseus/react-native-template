import { ONE_SECOND } from '@/core/constants';
import { debounce } from 'lodash';
import { DependencyList, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList = [],
  wait = ONE_SECOND,
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useCallback(debounce<T>(callback, wait), deps);

export default useDebounce;
