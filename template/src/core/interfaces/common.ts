/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonSize } from '@core/types';

export interface Measure extends CommonSize {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
}

export interface PromiseObj<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
