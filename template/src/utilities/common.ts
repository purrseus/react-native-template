/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { Language } from '@core/types';
import { getLocales } from 'react-native-localize';

export const wait = (timeout = ONE_SECOND) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));

export const createArray = (length = 0) => Array.from({ length }, (_, i) => i);

export const getCurrentLanguage = (): Language => {
  const [{ languageCode }] = getLocales();

  switch (languageCode) {
    case 'en':
      return 'en-US';
    case 'vi':
      return 'vi-VN';
    default:
      return 'en-US';
  }
};

export const deepAccessObject = <T extends Record<string, any>, V>(
  target: T,
  keyArray: string[],
): T | V => {
  if (!keyArray.length) return target;
  return keyArray.reduce((object, key) => {
    if (!!object && typeof object === 'object' && key in object) return object[key];
    return object;
  }, target);
};
