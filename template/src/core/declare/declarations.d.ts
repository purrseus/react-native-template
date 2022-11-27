/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Array<T> {
    /**
     * Get the first element of the array.
     */
    first: T;
    /**
     * Get the last element of the array.
     */
    last: T;
    /**
     * Swap position of two elements from an array. Return a swapped array.
     * @param indexA - The fist index of element to swap position.
     * @param indexB - The second index of element to swap position.
     */
    swap<S extends T>(indexA: number, indexB: number): S[];
  }

  interface Number {
    /**
     * Return true if and only if this number is odd.
     */
    isOdd: boolean;
    /**
     * Return true if and only if this number is even.
     */
    isEven: boolean;
  }

  interface ObjectConstructor {
    trimValues<T extends Record<string, any>>(o: T): T;
  }

  interface String {
    /**
     * Return true if string is empty.
     */
    isEmpty(): boolean;
    /**
     * Return a string without spaces.
     */
    removeWhiteSpaces(): this;
  }
}

export {};
