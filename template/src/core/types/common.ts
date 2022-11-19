import { File } from '@core/interfaces';
import { ScaledSize } from 'react-native';
import { BaseSchema } from 'yup';

type DateFormatTemplate = 'DD/MM/YYYY' | 'DD-MM-YYYY';
type TimeFormatTemplate = 'HH:mm' | 'HH:mm:ss';

export type CommonSize = Pick<ScaledSize, 'width' | 'height'>;

export type DateTimeFormatTemplate =
  | DateFormatTemplate
  | TimeFormatTemplate
  | `${DateFormatTemplate} ${TimeFormatTemplate}`;

export type NumberFormatTemplate = '0.0a' | '0 a' | '0a' | '0o' | '$0,0';

export type ValidationObject<T> = Record<keyof T, BaseSchema>;

export type PickedImageType = string | File;
