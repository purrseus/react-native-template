import { FlashList, FlashListProps } from '@shopify/flash-list';
import { ForwardedRef, forwardRef, useCallback, useRef } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';
import RefreshControl from '../loader/RefreshControl';

type FactoryListProps<T, F> = F extends true ? FlashListProps<T> : FlatListProps<T>;
export type FactoryListRef<T, F> = F extends true ? FlashList<T> : FlatList<T>;

export type ListProps<T, F> = Omit<FactoryListProps<T, F>, keyof RefreshControlProps> &
  Partial<RefreshControlProps> & {
    flashed?: F;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function List<T = any, F = false>(
  { flashed, refreshing = false, onRefresh, ...props }: ListProps<T, F>,
  ref: ForwardedRef<FactoryListRef<T, F>>,
) {
  const Component = flashed ? FlashList : FlatList;
  const keyRef = useRef<string | null>(null);

  const handleKeyExtractor = useCallback((item: T, index: number) => {
    // Use key if it exists
    if (keyRef.current) {
      return `${item[keyRef.current as keyof typeof item]}`;
    }

    // Find the key matching "id" in the first run
    if (keyRef.current === null) {
      let id = '';

      for (const key in item) {
        const shorterId = id.isNotEmpty && key.length < id.length;

        if (key.match(/id/gi) && (shorterId || id.isEmpty)) {
          id = key;
        }
      }

      if (!id.isEmpty) {
        keyRef.current = id;
        return `${item[id as keyof typeof item]}`;
      }

      // If any key is not matched, always return the index
      keyRef.current = '';
    }

    return `${index}`;
  }, []);

  if (flashed) {
    <FlashList
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={0.8}
      scrollEventThrottle={16}
      automaticallyAdjustContentInsets={false}
      automaticallyAdjustsScrollIndicatorInsets={false}
      keyExtractor={handleKeyExtractor}
      {...(props as FactoryListProps<T, true>)}
      {...(!!onRefresh && {
        refreshControl: <RefreshControl {...{ refreshing, onRefresh }} />,
      })}
      ref={ref as ForwardedRef<FactoryListRef<T, true>>}
    />;
  }

  return (
    <Component
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={0.8}
      scrollEventThrottle={16}
      automaticallyAdjustContentInsets={false}
      automaticallyAdjustsScrollIndicatorInsets={false}
      keyExtractor={handleKeyExtractor}
      {...(props as FactoryListProps<T, false>)}
      {...(!!onRefresh && {
        refreshControl: <RefreshControl {...{ refreshing, onRefresh }} />,
      })}
      ref={ref as ForwardedRef<FactoryListRef<T, false>>}
    />
  );
}

export default forwardRef(List);
