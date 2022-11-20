/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { ImageRequireSource } from 'react-native';

export interface CommonFieldProps<T = any> {
  name: string;
  label?: string;
  errorText?: string;
  value?: T;
  onChange?: (value: T) => void;
  onChangeText?: (text: T) => void;
}

export interface HeaderAction {
  icon: ImageRequireSource;
  size?: number;
  onPress: () => void;
}

export interface CheckboxItem<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface ActionSheetMethods {
  show: () => void;
  /** @platform android */
  hide: () => void;
}

export interface ImagePickerMethods {
  pick: () => void;
  replace: (replaceIndex: number) => void;
  delete: (deleteIndex?: number) => void;
}

export interface OverlayLoadingMethods {
  show: Dispatch<SetStateAction<boolean>>;
}

export interface DateTimePickerMethods {
  show: () => void;
}
