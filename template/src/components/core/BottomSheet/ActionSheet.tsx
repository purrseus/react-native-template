/* eslint-disable react-native/split-platform-components */
import { ActionSheetMethods, StyleCallbackParams } from '@core/interfaces';
import { useAppSelector, useColor, useStyle, useThrottle } from '@hooks';
import { alphaHexColor, compareMemo, duration, isIos, wait } from '@utilities';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import {
  ActionSheetIOS,
  ActionSheetIOSOptions,
  ColorValue,
  ListRenderItem,
  useColorScheme,
  View,
} from 'react-native';
import Divider from '../Layout/Divider';
import List from '../List/List';
import Modal from '../Modal/Modal';
import PressArea from '../Pressable/PressArea';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

export interface ActionSheetProps extends ActionSheetIOSOptions {
  onSelect: (buttonIndex: number) => void;
}

const HALF_SECONDS = duration({ seconds: 0.5 });
const ACTION_SHEET_ANIMATION_IN_TIMING = duration({ seconds: 0.33 });
const ACTION_SHEET_ANIMATION_OUT_TIMING = ACTION_SHEET_ANIMATION_IN_TIMING * 2;
const DEFAULT_MARGIN = 8;

const ActionSheet = compareMemo<ActionSheetMethods, ActionSheetProps>(
  forwardRef(({ onSelect, cancelButtonIndex = 0, tintColor, title, message, ...props }, ref) => {
    const colors = useColor();
    const styles = useStyle(createStyles);
    const { theme } = useAppSelector(state => state.common);
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);

    const options = useMemo(() => {
      const clonedOptions = [...props.options];
      clonedOptions.splice(cancelButtonIndex, 1);
      return clonedOptions;
    }, [cancelButtonIndex, props.options]);

    const onShow = useThrottle(
      () => {
        if (isIos()) {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              ...props,
              title,
              message,
              options: props.options,
              userInterfaceStyle: theme === 'auto' ? colorScheme || 'light' : theme,
              cancelButtonIndex,
            },
            onSelect,
          );
          return;
        }

        setIsVisible(true);
      },
      [cancelButtonIndex, colorScheme, colors.primaryText, message, onSelect, props, theme, title],
      HALF_SECONDS,
    );

    const onHide = useThrottle(
      async (buttonIndex = cancelButtonIndex) => {
        /**
         * @see Modal onBackdropPress below
         */
        if (!isIos() && typeof buttonIndex === 'number') {
          setIsVisible(false);
          await wait(ACTION_SHEET_ANIMATION_IN_TIMING);
          onSelect(buttonIndex);
        }
      },
      [cancelButtonIndex, onSelect],
      HALF_SECONDS,
    );

    const handleSelectOption = useCallback(
      // isCancel to distinguish between buttonIndex 0 of the selection item and buttonIndex 0 of the action sheet
      (buttonIndex: number, isCancel?: boolean) => async () => {
        await onHide(
          buttonIndex === cancelButtonIndex && isCancel
            ? cancelButtonIndex
            : props.options.indexOf(options[buttonIndex]),
        );
      },
      [cancelButtonIndex, onHide, options, props.options],
    );

    useImperativeHandle(
      ref,
      () => ({
        show: onShow,
        hide: onHide,
      }),
      [onShow, onHide],
    );

    const ItemSeparatorComponent = useCallback(
      () => <Divider height={1 / 3} color={styles.divider.color} />,
      [styles.divider.color],
    );

    const ListHeaderComponent = useMemo(() => {
      const hasTitleOrMessage = !!title || !!message;
      const SpaceSeparator = !!title && !!message ? <Spacer h={4} /> : null;

      return hasTitleOrMessage ? (
        <View>
          <View style={styles.header}>
            {!!title && (
              <Text style={[styles.headerText, !!message && styles.boldedTitle]}>{title}</Text>
            )}
            {SpaceSeparator}
            {!!message && (
              <Text style={[styles.headerText, !title && styles.boldedTitle]}>{message}</Text>
            )}
            {SpaceSeparator}
          </View>

          <Divider height={0.5} color={styles.divider.color} />
        </View>
      ) : null;
    }, [
      message,
      styles.boldedTitle,
      styles.divider.color,
      styles.header,
      styles.headerText,
      title,
    ]);

    const renderOptionItem: ListRenderItem<string> = useCallback(
      ({ item, index }) => (
        <PressArea onPress={handleSelectOption(index)} style={styles.option}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            ellipsizeMode="middle"
            style={[
              styles.optionTitle,
              !!tintColor && styles.optionTitleColor(tintColor as ColorValue),
              typeof props.destructiveButtonIndex === 'number' &&
                props.destructiveButtonIndex === props.options.indexOf(options[index]) &&
                styles.destructiveTitle,
            ]}
          >
            {item}
          </Text>
        </PressArea>
      ),
      [handleSelectOption, options, props.destructiveButtonIndex, props.options, styles, tintColor],
    );

    if (isIos()) return null;
    return (
      <Modal
        type="bottomSheet"
        isVisible={isVisible}
        animationInTiming={ACTION_SHEET_ANIMATION_IN_TIMING}
        animationOutTiming={ACTION_SHEET_ANIMATION_OUT_TIMING}
        onBackdropPress={onHide}
      >
        <View style={styles.container}>
          <List
            data={options}
            scrollEnabled={false}
            renderItem={renderOptionItem}
            style={styles.optionContainer}
            {...{ ListHeaderComponent, ItemSeparatorComponent }}
          />

          <Spacer h={DEFAULT_MARGIN} />

          <View style={styles.optionContainer}>
            <PressArea onPress={handleSelectOption(cancelButtonIndex, true)} style={styles.option}>
              <Text
                style={[
                  styles.optionTitle,
                  styles.cancelTitle,
                  !!tintColor && styles.optionTitleColor(tintColor as ColorValue),
                ]}
              >
                {props.options[cancelButtonIndex]}
              </Text>
            </PressArea>
          </View>
        </View>
      </Modal>
    );
  }),
);

const createStyles = ({ create, colors, edgeInsets, dimensions }: StyleCallbackParams) =>
  create({
    container: {
      alignSelf: 'center',
      width: dimensions.width - DEFAULT_MARGIN * 2 - edgeInsets.left - edgeInsets.right,
      marginBottom: edgeInsets.bottom || DEFAULT_MARGIN,
      marginTop: edgeInsets.top,
    },
    optionContainer: {
      borderRadius: 12,
      backgroundColor: colors.white,
    },
    header: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 12,
      color: alphaHexColor(colors.darkGray, 0.8),
    },
    boldedTitle: {
      fontWeight: 'bold',
    },
    option: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    optionTitle: {
      fontSize: 18,
    },
    optionTitleColor: (color: ColorValue) => ({
      color,
    }),
    destructiveTitle: {
      color: colors.red,
    },
    cancelTitle: {
      fontWeight: 'bold',
    },
    divider: {
      color: alphaHexColor(colors.darkGray, 0.5),
    },
  });

export default ActionSheet;
