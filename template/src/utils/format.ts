import dayjs from 'dayjs';
import numeral from 'numeral';

export namespace Formatter {
  type DateTemplate = 'DD/MM/YYYY' | 'DD-MM-YYYY';
  type TimeTemplate = 'HH:mm' | 'HH:mm:ss';

  type DateTimeTemplate = DateTemplate | TimeTemplate | `${DateTemplate} ${TimeTemplate}`;
  type NumberTemplate = '0.0a' | '0 a' | '0a' | '0o' | '$0,0';

  export const formatDateTime = (date: FirstParameter<typeof dayjs>, template?: DateTimeTemplate) =>
    dayjs(date).format(template || 'DD/MMM/YYYY HH:mm');

  export const formatNumber = (input: FirstParameter<typeof numeral>, template?: NumberTemplate) =>
    numeral(input).format(template || '0,0');
}
