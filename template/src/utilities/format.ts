/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_DATE_TIME_FORMAT_TEMPLATE, DEFAULT_NUMBER_FORMAT_TEMPLATE } from '@core/constants';
import { DateTimeFormatTemplate, NumberFormatTemplate } from '@core/types';
import dayjs from 'dayjs';
import numeral from 'numeral';

export const referenceTypeFormatter = (value: any, tabWidth = 2) =>
  JSON.stringify(value, null, tabWidth);

export const _formatDateTime = (
  dateTime: Date | string | number,
  formatTemplate?: DateTimeFormatTemplate,
) => dayjs(dateTime).format(formatTemplate || DEFAULT_DATE_TIME_FORMAT_TEMPLATE);

export const _formatNumber = (number: number, formatTemplate?: NumberFormatTemplate) =>
  numeral(number).format(formatTemplate || DEFAULT_NUMBER_FORMAT_TEMPLATE);

export const duration = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const hoursInMs = hours * 60 * 60 * 1000;
  const minutesInMs = minutes * 60 * 1000;
  const secondsInMs = seconds * 1000;

  return hoursInMs + minutesInMs + secondsInMs;
};
