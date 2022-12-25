import { DEFAULT_DATE_TIME_FORMAT_TEMPLATE, DEFAULT_NUMBER_FORMAT_TEMPLATE } from '@core/constants';
import { DateTimeFormatTemplate, NumberFormatTemplate } from '@core/types';
import dayjs from 'dayjs';
import numeral from 'numeral';

export const _formatDateTime = (
  dateTime: Date | string | number,
  formatTemplate?: DateTimeFormatTemplate,
) => dayjs(dateTime).format(formatTemplate || DEFAULT_DATE_TIME_FORMAT_TEMPLATE);

export const _formatNumber = (number: number, formatTemplate?: NumberFormatTemplate) =>
  numeral(number).format(formatTemplate || DEFAULT_NUMBER_FORMAT_TEMPLATE);
