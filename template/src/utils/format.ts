import { DateTimeFormatTemplate, NumberFormatTemplate } from '@/core/types';
import dayjs from 'dayjs';
import numeral from 'numeral';

export const _formatDateTime = (
  dateTime: Date | string | number,
  formatTemplate?: DateTimeFormatTemplate,
) => dayjs(dateTime).format(formatTemplate || 'DD/MMM/YYYY HH:mm');

export const _formatNumber = (number: number, formatTemplate?: NumberFormatTemplate) =>
  numeral(number).format(formatTemplate || '0,0');
