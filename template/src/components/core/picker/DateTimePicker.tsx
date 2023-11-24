import { DateTimePickerMethods } from '@/core/interfaces';
import { useAppTranslation, useTailwind } from '@/hooks';
import { useCommonStore } from '@/stores';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';

type PlatformDisplayKey = NonNullable<ReactNativeModalDateTimePickerProps['mode']>;
type PlatformDisplayValue = NonNullable<ReactNativeModalDateTimePickerProps['display']>;

function platformSelect(android: PlatformDisplayValue, ios: PlatformDisplayValue) {
  return Platform.select({ android, ios })!;
}

const platformDisplay: Record<PlatformDisplayKey, PlatformDisplayValue> = {
  date: platformSelect('calendar', 'inline'),
  datetime: platformSelect('default', 'spinner'),
  time: platformSelect('clock', 'spinner'),
};

function DateTimePicker(
  { mode = 'date', onConfirm, ...props }: Partial<ReactNativeModalDateTimePickerProps>,
  ref: ForwardedRef<DateTimePickerMethods>,
) {
  const tw = useTailwind();
  const { t } = useAppTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const language = useCommonStore(state => state.language);

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
    <DateTimePickerModal
      {...props}
      isVisible={isVisible}
      mode={mode}
      display={platformDisplay[mode]}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      isDarkModeEnabled={tw.prefixMatch('dark')}
      accentColor={tw.color('emerald-500')}
      cancelTextIOS={t('cancel')}
      confirmTextIOS={t('confirm')}
      locale={language}
    />
  );
}

export default forwardRef(DateTimePicker);
