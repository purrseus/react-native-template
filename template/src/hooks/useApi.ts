/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpSignal } from '@core/types';
import { DependencyList, useCallback, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';

interface ApiStatus<T> {
  fetching: boolean;
  refetching: boolean;
  data?: Awaited<T>;
  error?: any;
}

const useApi = <T>(
  request: HttpSignal<T>,
  deps: DependencyList,
): [ApiStatus<T>, () => Promise<void>] => {
  const controller = useRef<AbortController | null>(new AbortController());
  const [apiStatus, updateApiStatus] = useImmer<ApiStatus<T>>({
    fetching: false,
    refetching: false,
  });

  const updateState = useCallback(
    <K extends keyof ApiStatus<T>>(key: K, value: ApiStatus<T>[K]) =>
      updateApiStatus(draft => {
        draft[key] = value;
      }),
    [updateApiStatus],
  );

  const fetch = useCallback(async (isRefetch = true) => {
    if (!controller.current) return;
    const stateKey: keyof ApiStatus<T> = isRefetch ? 'refetching' : 'fetching';

    try {
      updateState(stateKey, true);
      const response = await request(controller.current.signal);
      updateState('data', response);
    } catch (error) {
      updateState('error', error);
    } finally {
      updateState(stateKey, false);
    }
  }, deps);

  useEffect(() => {
    fetch(false);

    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, deps);

  return [apiStatus, fetch];
};
export default useApi;
