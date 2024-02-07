import { useTailwind, useThrottle } from '@/hooks';
import {
  GetNextPageParamFunction,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { View } from 'react-native';
import ActivityIndicator from '../loader/ActivityIndicator';
import List, { FactoryListRef, ListProps } from './List';

type InfiniteListProps<T, F> = Omit<ListProps<T, F>, 'data'> & {
  queryKey: QueryKey;
  queryFn: QueryFunction<T[]>;
  getNextPageParam?: GetNextPageParamFunction<T[]>;
  ListFetchingComponent?: ListProps<T, true>['ListEmptyComponent'];
  ListErrorComponent?: ListProps<T, true>['ListEmptyComponent'];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfiniteList<T = any, F = false>(
  {
    queryKey,
    queryFn,
    getNextPageParam,
    ListFetchingComponent,
    ListErrorComponent,
    ListEmptyComponent,
    ...props
  }: InfiniteListProps<T, F>,
  ref: ForwardedRef<FactoryListRef<T, F>>,
) {
  const tw = useTailwind();
  const [refreshing, setRefreshing] = useState(false);

  const { fetchNextPage, data, isError, hasNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: getNextPageParam || ((_, allPages) => allPages.length + 1),
    retry: false,
  });

  const isFetching = isLoading && !refreshing;

  const FetchingComponent = useMemo(
    () =>
      ListFetchingComponent || (
        <View style={tw`flex-fill-center`}>
          <ActivityIndicator size="large" />
        </View>
      ),
    [ListFetchingComponent, tw],
  );

  const ListFooterComponent = useMemo(
    () => (
      <View style={tw`py-2`}>
        <ActivityIndicator />
      </View>
    ),
    [tw],
  );

  const handleOnRefresh = useThrottle(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [setRefreshing, refetch]);

  const handleOnEndReached = useThrottle(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    // @ts-ignore
    <List<T, F>
      {...props}
      data={data?.pages.flat()}
      refreshing={refreshing}
      onRefresh={handleOnRefresh}
      ref={ref}
      onEndReached={handleOnEndReached}
      ListEmptyComponent={
        isError ? ListErrorComponent : isFetching ? FetchingComponent : ListEmptyComponent
      }
      {...(hasNextPage && { ListFooterComponent })}
    />
  );
}

export default forwardRef(InfiniteList);
