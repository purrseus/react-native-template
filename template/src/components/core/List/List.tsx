/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import { ForwardedRef, forwardRef, RefAttributes, useCallback, useRef } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';
import RefreshControl from '../Loader/RefreshControl';
import BottomSpacer from '../Spacer/BottomSpacer';

export interface ListProps<T = any>
  extends Omit<FlatListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
}

const _List = (
  { refreshing = false, onRefresh, ListFooterComponent, isTabScreen = false, ...props }: ListProps,
  ref: ForwardedRef<FlatList>,
) => {
  const keyRef = useRef<string | null>(null);

  const handleKeyExtractor = useCallback((item: Record<string, any>, index: number) => {
    // Use key if it exists
    if (keyRef.current) {
      return item[keyRef.current];
    }

    // Find the key matching "id" in the first run
    if (keyRef.current === null) {
      let id = '';

      for (const key in item) {
        const shorterId = !id.isEmpty && key.length < id.length;

        if (key.match(/id/gi) && (shorterId || id.isEmpty)) {
          id = key;
        }
      }

      if (!id.isEmpty) {
        keyRef.current = id;
        return `${item[id]}`;
      }

      // If any key is not matched, always return the index
      keyRef.current = '';
    }

    return `${index}`;
  }, []);

  return (
    <FlatList
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      automaticallyAdjustContentInsets={false}
      automaticallyAdjustsScrollIndicatorInsets={false}
      {...props}
      {...(!!onRefresh && {
        refreshControl: <RefreshControl {...{ refreshing, onRefresh }} />,
      })}
      ref={ref}
      keyExtractor={handleKeyExtractor}
      ListFooterComponent={
        <>
          {ListFooterComponent}
          {isTabScreen && <BottomSpacer type="bottomTab" />}
        </>
      }
    />
  );
};

const List = compareMemo<FlatList, ListProps>(forwardRef(_List)) as <T = any>(
  props: ListProps<T> & RefAttributes<FlatList<T>>,
) => JSX.Element;

export default List;
