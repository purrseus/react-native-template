import { Alert } from '@/components/core';
import { DateTimePickerMethods } from '@/core/interfaces';
import { useImagePicker } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

const usePickerContainer = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const dateTimePickerRef = useRef<DateTimePickerMethods | null>(null);
  const { images, pickImage } = useImagePicker();

  useEffect(() => {
    if (images.isNotEmpty)
      Alert(
        formatReferenceType(typeof images.first !== 'string' ? images.first.uri : images.first),
      );
  }, [images]);

  useEffect(() => {
    if (dateTime) Alert(dateTime.toString());
  }, [dateTime]);

  const showImagePicker = pickImage;

  const showDateTimePicker = () => dateTimePickerRef.current?.show();

  return {
    dateTime,
    setDateTime,
    dateTimePickerRef,
    showImagePicker,
    showDateTimePicker,
  };
};

export default usePickerContainer;
