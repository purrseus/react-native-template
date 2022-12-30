/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LANGUAGE_MAP, ONE_SECOND } from '@core/constants';
import dayjs from 'dayjs';
import { Platform } from 'react-native';

global.isAndroid = () => Platform.OS === 'android';

global.isIos = () => Platform.OS === 'ios';

global.referenceTypeFormatter = (value, space = 2) => JSON.stringify(value, null, space);

global.logger = (message: any) => {
  if (!__DEV__) return;
  const platformName = Platform.select({ android: 'ANDROID', ios: 'IOS' });
  const dateTime = dayjs(new Date()).locale(LANGUAGE_MAP['en-US']).format('DD/MM HH:mm:ss:SSS');
  const formattedMessage = typeof message === 'object' ? referenceTypeFormatter(message) : message;

  console.log(`${platformName} [${dateTime}]`, formattedMessage);
};

global.duration = ({ days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) => {
  const daysInMs = days * 24 * 60 * 60 * 1000;
  const hoursInMs = hours * 60 * 60 * 1000;
  const minutesInMs = minutes * 60 * 1000;
  const secondsInMs = seconds * 1000;

  return daysInMs + hoursInMs + minutesInMs + secondsInMs + milliseconds;
};

global.wait = (timeout = ONE_SECOND) => new Promise(resolve => setTimeout(resolve, timeout));

global.createAscendingOrderArray = (length = 0) => Array.from({ length }, (_, i) => i);

export * from './array';
export * from './number';
export * from './object';
export * from './string';
