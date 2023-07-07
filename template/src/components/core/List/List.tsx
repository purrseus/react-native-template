/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlashList, FlashListProps as RNFlashListProps } from '@shopify/flash-list';
import { compareMemo } from '@utilities';
import { forwardRef, RefAttributes, useCallback, useRef } from 'react';
import { FlatList, FlatListProps as RNFlatListProps, RefreshControlProps } from 'react-native';
import RefreshControl from '../Loader/RefreshControl';
import BottomSpacer from '../Spacer/BottomSpacer';

interface FlatListProps<T = any, F = false>
  extends Omit<RNFlatListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
  isFlashList?: F;
}

interface FlashListProps<T = any, F = true>
  extends Omit<RNFlashListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
  isFlashList: F;
}

export type ListProps<T = any, F = false> = F extends true
  ? FlashListProps<T, F>
  : FlatListProps<T, F>;

const _List = compareMemo<FlatList, ListProps>(
  forwardRef(
    (
      {
        isFlashList,
        refreshing = false,
        onRefresh,
        ListFooterComponent,
        isTabScreen = false,
        ...props
      },
      ref,
    ) => {
      const Component = isFlashList ? FlashList : FlatList;
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
            const shorterId = id.isNotEmpty && key.length < id.length;

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
        <Component
          removeClippedSubviews
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onEndReachedThreshold={0.8}
          scrollEventThrottle={16}
          automaticallyAdjustContentInsets={false}
          automaticallyAdjustsScrollIndicatorInsets={false}
          keyExtractor={handleKeyExtractor}
          {...props}
          {...(!!onRefresh && {
            refreshControl: <RefreshControl {...{ refreshing, onRefresh }} />,
          })}
          ref={ref}
          ListFooterComponent={
            <>
              {ListFooterComponent}
              {isTabScreen && <BottomSpacer type="bottomTab" />}
            </>
          }
        />
      );
    },
  ),
);

const List = _List as <T = any, F = false>(
  props: ListProps<T, F> & RefAttributes<F extends true ? FlashList<T> : FlatList<T>>,
) => JSX.Element;

export default List;
