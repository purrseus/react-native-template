import { CommonSize } from '@/core/types';

export interface Measure extends CommonSize {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
}

export interface PromiseObject<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
}
