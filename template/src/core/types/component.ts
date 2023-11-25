import { ControllerProps, ControllerRenderProps } from 'react-hook-form';

export type FieldProps<T> = Omit<T, keyof ControllerRenderProps> & {
  name: string;
  label?: string;
  _fieldProps?: Parameters<ControllerProps['render']>[0];
};
