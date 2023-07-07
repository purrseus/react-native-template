/* eslint-disable no-console */
import { LANGUAGE_MAP, ONE_SECOND } from '@core/constants';
import dayjs from 'dayjs';
import { Platform } from 'react-native';

global.isAndroid = () => Platform.OS === 'android';

global.isIos = () => Platform.OS === 'ios';

global.referenceTypeFormatter = (value, space = 2) =>
  typeof value === 'object' ? JSON.stringify(value, null, space) : value;

global.print = (...args) => {
  if (!__DEV__) return;
  const NO_COLOR = false;

  const consoleColor = new Proxy(
    {
      bold: '\x1b[1m',
      noColor: '\x1b[0m',
      green: '\x1b[32m',
      gray: '\x1b[90m',
      cyan: '\x1b[36m',
    },
    {
      get: (target, prop) =>
        !NO_COLOR && prop in target ? target[prop as keyof typeof target] : '',
    },
  );

  const [message, ...optionalParams] = args;
  const combinedMessage = optionalParams.isEmpty ? message : args;
  const { bold, noColor, green, gray, cyan } = consoleColor;

  const platformName = Platform.select({
    android: `${bold}${green}Android${noColor}`,
    ios: `${bold}${gray}iOS${noColor}`,
  });

  const dateTime = dayjs().locale(LANGUAGE_MAP['en-US']).format('HH:mm:ss:SSS');

  console.log(
    `${cyan}[${dateTime}]${noColor} ${platformName}:`,
    referenceTypeFormatter(combinedMessage),
  );
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
