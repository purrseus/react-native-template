import { DateTimePickerMethods, StyleCallbackParams } from '@core/interfaces';
import { useAppSelector, useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme } from 'react-native';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps as Props,
} from 'react-native-modal-datetime-picker';

type PlatformDisplayKey = NonNullable<Props['mode']>;
type PlatformDisplayValue = NonNullable<Props['display']>;
type PlatformDisplay = Record<PlatformDisplayKey, PlatformDisplayValue>;

function displaySelect<T extends PlatformDisplayValue>(specifics: { android: T; ios: T }): T {
  return Platform.select<T>(specifics)!;
}

const platformDisplay: PlatformDisplay = {
  date: displaySelect({ android: 'calendar', ios: 'inline' }),
  datetime: displaySelect({ android: 'default', ios: 'spinner' }),
  time: displaySelect({ android: 'clock', ios: 'spinner' }),
};

const DateTimePicker = compareMemo<DateTimePickerMethods, Partial<Props>>(
  // @ts-ignore
  forwardRef(({ mode = 'date', onConfirm, ...props }, ref) => {
    const { t } = useTranslation();
    const styles = useStyle(createStyles);
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useAppSelector(state => state.common);

    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          setIsVisible(true);
        },
      }),
      [],
    );

    const handleCancel = () => setIsVisible(false);

    const handleConfirm: typeof onConfirm = date => {
      handleCancel();
      onConfirm?.(date);
    };

    return (
      // @ts-ignore
      <DateTimePickerModal
        {...props}
        isVisible={isVisible}
        mode={mode}
        display={platformDisplay[mode]}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isDarkModeEnabled={colorScheme === 'dark'}
        accentColor={styles.selected.color}
        cancelTextIOS={t('common.cancel')}
        confirmTextIOS={t('common.confirm')}
        locale={language}
      />
    );
  }),
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    selected: {
      color: colors.primary,
    },
  });

export default DateTimePicker;
