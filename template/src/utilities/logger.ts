/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { LANGUAGE_MAP } from '@core/constants';
import dayjs from 'dayjs';
import { Platform } from 'react-native';
import { referenceTypeFormatter } from './format';

export const logger = (message: any) => {
  if (!__DEV__) return;
  const platformName = Platform.select({ android: 'ANDROID', ios: 'IOS' });
  const dateTime = dayjs(new Date()).locale(LANGUAGE_MAP['en-US']).format('DD/MM HH:mm:ss:SSS');
  const formattedMessage = typeof message === 'object' ? referenceTypeFormatter(message) : message;

  console.log(`${platformName} [${dateTime}]`, formattedMessage);
};
