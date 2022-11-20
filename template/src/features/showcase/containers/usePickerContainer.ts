import { Alert } from '@components/core';
import { DateTimePickerMethods, ImagePickerMethods } from '@core/interfaces';
import { PickedImageType } from '@core/types';
import { referenceTypeFormatter } from '@utilities';
import { useEffect, useRef, useState } from 'react';

const usePickerContainer = () => {
  const [images, setImages] = useState<PickedImageType[]>([]);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);
  const dateTimePickerRef = useRef<DateTimePickerMethods | null>(null);

  useEffect(() => {
    if (images.length)
      Alert(
        referenceTypeFormatter(typeof images.first !== 'string' ? images.first.uri : images.first),
      );
  }, [images]);

  useEffect(() => {
    if (dateTime) Alert(dateTime.toString());
  }, [dateTime]);

  const showImagePicker = () => imagePickerRef.current?.pick();

  const showDateTimePicker = () => dateTimePickerRef.current?.show();

  return {
    images,
    setImages,
    dateTime,
    setDateTime,
    imagePickerRef,
    dateTimePickerRef,
    showImagePicker,
    showDateTimePicker,
  };
};

export default usePickerContainer;
