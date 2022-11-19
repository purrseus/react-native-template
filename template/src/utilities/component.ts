/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonFieldProps, OverlayLoadingMethods } from '@core/interfaces';
import {
  createRef,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  memo,
  PropsWithoutRef,
  RefAttributes,
  RefCallback,
  useCallback,
  useMemo,
} from 'react';
import isEqual from 'react-fast-compare';
import { useController, useFormContext } from 'react-hook-form';

export const overlayLoadingRef = createRef<OverlayLoadingMethods>();

export const overlayLoading = {
  show: () => overlayLoadingRef.current?.show(true),
  hide: () => overlayLoadingRef.current?.show(false),
};

export const compareMemo = <T, P = undefined>(
  Component: P extends undefined
    ? (props: T) => JSX.Element
    : ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => memo(Component, isEqual);

export const createField = <R, P extends CommonFieldProps>(
  Component: ForwardRefRenderFunction<R, P>,
  isTextInput: boolean = false,
) => {
  return memo(
    forwardRef<R, P>((props, ref) => {
      const { control } = useFormContext();

      const {
        field: { onChange, value, ref: controllerRef },
        formState: { errors },
      } = useController({ name: props.name, control });

      const fieldProps = useMemo<CommonFieldProps<typeof props.value>>(
        () => ({
          [isTextInput ? 'onChangeText' : 'onChange']: onChange,
          errorText: (errors[props.name] as any)?.message,
          value,
          name: props.name,
        }),
        [onChange, value, props.name, errors[props.name]],
      );

      const refCallback = useCallback<RefCallback<R>>(
        instance => {
          if (ref) {
            'current' in ref ? (ref.current = instance) : ref?.(instance);
          }
          controllerRef(instance);
        },
        [controllerRef, ref],
      );

      return Component({ ...props, ...fieldProps }, refCallback);
    }),
    isEqual,
  );
};
