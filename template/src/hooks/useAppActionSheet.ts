import {
  ActionSheetOptions,
  ActionSheetProps,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { useCommonStore } from '@/stores';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import useTailwind from './useTailwind';

type UseActionSheet = (
  ...args: Parameters<ActionSheetProps['showActionSheetWithOptions']>
) => () => void;

const useAppActionSheet: UseActionSheet = (actionSheetOptions, callback) => {
  const tw = useTailwind();
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useCommonStore(state => state.theme);
  const colorScheme = useColorScheme();

  const showActionSheet = useCallback(() => {
    const keepOriginalValue = !Number.isInteger(actionSheetOptions.cancelButtonIndex) || isIos();

    const options = keepOriginalValue
      ? actionSheetOptions.options
      : actionSheetOptions.options.slice(1).concat(actionSheetOptions.options.slice(0, 1));

    const cancelButtonIndex = keepOriginalValue
      ? actionSheetOptions.cancelButtonIndex
      : options.lastIndex;

    const additionalOptions: ActionSheetOptions = {
      options,
      cancelButtonIndex,
      userInterfaceStyle: theme === 'auto' ? colorScheme || 'light' : theme,
      containerStyle: tw`bg-white dark:bg-zinc-900 rounded-t-2xl`,
      titleTextStyle: tw.style(
        'text-sm bg-zinc-400/80',
        !!actionSheetOptions.message && 'font-bold',
      ),
      messageTextStyle: tw.style(
        'text-sm bg-zinc-400/80',
        !!actionSheetOptions.title && 'mt-0 font-bold',
      ),
      textStyle: tw`shrink text-zinc-700 dark:text-white`,
      showSeparators: false,
      destructiveColor: tw.color('red-500'),
    };

    return showActionSheetWithOptions({ ...actionSheetOptions, ...additionalOptions }, index =>
      callback(keepOriginalValue ? index : index === options.lastIndex ? 0 : (index ?? -1) + 1),
    );
  }, [actionSheetOptions, theme, colorScheme, tw, showActionSheetWithOptions, callback]);

  return showActionSheet;
};

export default useAppActionSheet;
