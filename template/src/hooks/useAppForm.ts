import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { z, ZodRawShape } from 'zod';

const useAppForm = <Z extends ZodRawShape>(
  schema: z.ZodObject<Z>,
  formOptions?: UseFormProps<z.infer<typeof schema>>,
) =>
  useForm({
    resolver: zodResolver(schema),
    ...formOptions,
  });

export default useAppForm;
