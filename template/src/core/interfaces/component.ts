/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FC, SetStateAction } from 'react';
import { SvgProps } from 'react-native-svg';

export interface AppBarAction {
  Icon: FC<SvgProps>;
  size?: number;
  onPress: () => void;
}

export interface CheckboxItem<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface OverlayLoadingMethods {
  show: Dispatch<SetStateAction<boolean>>;
}

export interface DateTimePickerMethods {
  show: () => void;
}
