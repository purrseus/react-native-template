import { CheckboxItem } from '@core/interfaces';
import { ValidationObject } from '@core/types';
import { useAppForm } from '@hooks';
import { logger } from '@utilities';
import { useMemo } from 'react';
import { array, string } from 'yup';

export interface FormObject {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  gender: 'male' | 'female';
  usingPhone: string[];
}

enum OS {
  Android,
  Ios,
}

const useFormContainer = () => {
  const checkboxData: CheckboxItem<OS>[] = [
    { label: 'Android', value: OS.Android },
    { label: 'iOS', value: OS.Ios },
  ];

  const validateObj = useMemo<ValidationObject<FormObject>>(
    () => ({
      firstName: string().required(),
      lastName: string().required(),
      age: string().matches(/\d+/).required(),
      address: string().required(),
      gender: string().oneOf(['Male', 'Female']).required(),
      usingPhone: array().of(string()),
    }),
    [],
  );

  const formMethods = useAppForm<FormObject>(validateObj);

  const onSubmit = formMethods.handleSubmit(values => logger(values));

  return { checkboxData, formMethods, onSubmit };
};

export default useFormContainer;
