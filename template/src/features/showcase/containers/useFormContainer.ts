import { CheckboxItem } from '@core/interfaces';
import { useAppForm } from '@hooks';
import { useMemo } from 'react';
import { z } from 'zod';

enum OS {
  Android,
  Ios,
}

const useFormContainer = () => {
  const checkboxData: CheckboxItem<OS>[] = [
    { label: 'Android', value: OS.Android },
    { label: 'iOS', value: OS.Ios },
  ];

  const formSchema = useMemo(
    () =>
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        age: z.string().regex(/\d+/),
        address: z.string(),
        gender: z.enum(['Male', 'Female']),
        phones: z.array(z.nativeEnum(OS)),
      }),
    [],
  );

  const form = useAppForm(formSchema);

  const formNames = formSchema.keyof().enum;

  const formLabels = Object.fromEntries(
    Object.entries(formNames).map(([key, value]) => [key, value.capitalize()]),
  ) as Record<keyof typeof formNames, string>;

  const onSubmit = form.handleSubmit(
    values => print(values),
    errors => print(errors),
  );

  return { checkboxData, form, onSubmit, formNames, formLabels };
};

export default useFormContainer;
