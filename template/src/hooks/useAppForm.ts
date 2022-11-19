import { ValidationObject } from '@core/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { object } from 'yup';

const useAppForm = <T extends FieldValues>(
  validateObject: ValidationObject<T>,
  formOptions?: UseFormProps<T>,
) =>
  useForm<T>({
    resolver: yupResolver(object().shape(validateObject)),
    ...formOptions,
  });

export default useAppForm;
