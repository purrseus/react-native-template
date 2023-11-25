import { Children, createElement } from 'react';
import { Controller, FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: JSX.Element[];
}

export default function Form<T extends FieldValues>({ children, form }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      {Children.map(children, child => {
        return child.props.name ? (
          <Controller
            key={child.props.name}
            name={child.props.name}
            control={form.control}
            render={_fieldProps =>
              createElement(child.type, {
                ...child.props,
                _fieldProps,
              })
            }
          />
        ) : (
          child
        );
      })}
    </FormProvider>
  );
}
