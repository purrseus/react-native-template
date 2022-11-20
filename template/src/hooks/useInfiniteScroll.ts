/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteScrollConfig, PaginationResponse } from '@core/interfaces';
import { deepAccessObject, logger } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import { Draft } from 'immer';
import { useCallback, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useImmer } from 'use-immer';

interface InfiniteScrollRef<Params> {
  isFirstCall: boolean;
  loadingMore: boolean;
  paramsRef: Params;
  pageIndex: number;
}

interface InfiniteScroll<Data> {
  fetching: boolean;
  refreshing: boolean;
  canLoadMore: boolean;
  data: Data;
}

interface UseInfiniteScrollReturn<D> extends InfiniteScroll<D> {
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_INDEX_KEY = '_page'; // or pageIndex, page,...
const PAGE_SIZE_KEY = '_limit'; // or pageSize, perPage, limit,...

const useInfiniteScroll = <T extends PaginationResponse<D>, D extends any[]>(
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<T>,
  {
    pageSize = DEFAULT_PAGE_SIZE,
    params = {},
    accessProperties = ['data'],
  }: InfiniteScrollConfig = {},
): UseInfiniteScrollReturn<D> => {
  const controller = useRef(new AbortController()).current;

  const infiniteScrollRef = useRef<InfiniteScrollRef<InfiniteScrollConfig['params']>>({
    isFirstCall: true,
    paramsRef: params,
    loadingMore: false,
    pageIndex: 1,
  }).current;

  const [infiniteScroll, updateInfiniteScroll] = useImmer<InfiniteScroll<D>>({
    fetching: true,
    refreshing: false,
    canLoadMore: true,
    data: [] as unknown as D,
  });

  const handleRequest = useCallback(async () => {
    try {
      const response = await requestCallback({
        params: {
          [PAGE_INDEX_KEY]: infiniteScrollRef.pageIndex,
          [PAGE_SIZE_KEY]: pageSize,
          ...infiniteScrollRef.paramsRef,
        },
        signal: controller.signal,
      });

      const responseData = deepAccessObject<T, D>(response, accessProperties);

      if (!Array.isArray(responseData)) return [];

      if (responseData.length < pageSize)
        updateInfiniteScroll(draft => {
          draft.canLoadMore = false;
        });

      if (infiniteScrollRef.isFirstCall)
        updateInfiniteScroll(draft => {
          draft.data = responseData as Draft<D>;
        });

      return responseData;
    } catch (error) {
      logger(error);
    } finally {
      updateInfiniteScroll(draft => {
        draft.fetching = false;
      });
      if (infiniteScrollRef.isFirstCall) infiniteScrollRef.isFirstCall = false;
    }
  }, [accessProperties, controller.signal, pageSize, updateInfiniteScroll]);

  const onRefresh = useCallback(async () => {
    if (infiniteScrollRef.loadingMore) return;

    try {
      infiniteScrollRef.pageIndex = 1;

      updateInfiniteScroll(draft => {
        draft.canLoadMore = true;
        draft.refreshing = true;
      });

      const responseData = await handleRequest();

      if (Array.isArray(responseData))
        updateInfiniteScroll(draft => {
          draft.data = responseData as Draft<D>;
        });
    } catch (error) {
      logger(error);
    } finally {
      updateInfiniteScroll(draft => {
        draft.refreshing = false;
      });
    }
  }, [handleRequest, updateInfiniteScroll]);

  const onLoadMore = useCallback(async () => {
    if (!infiniteScroll.canLoadMore || infiniteScrollRef.loadingMore) return;

    try {
      infiniteScrollRef.pageIndex += 1;
      infiniteScrollRef.loadingMore = true;
      const responseData = await handleRequest();

      if (Array.isArray(responseData))
        updateInfiniteScroll(draft => {
          draft.data.push(...responseData);
        });
    } catch (error) {
      logger(error);
    } finally {
      infiniteScrollRef.loadingMore = false;
    }
  }, [handleRequest, infiniteScroll.canLoadMore, updateInfiniteScroll]);

  useEffect(() => {
    handleRequest();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!infiniteScrollRef.isFirstCall && !isEqual(params, infiniteScrollRef.paramsRef)) {
      infiniteScrollRef.paramsRef = params;
      onRefresh();
    }
  }, [params, onRefresh]);

  return {
    ...infiniteScroll,
    onRefresh,
    onLoadMore,
  };
};

export default useInfiniteScroll;
