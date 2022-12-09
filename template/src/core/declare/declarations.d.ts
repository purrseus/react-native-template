/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Array<T> {
    /**
     * Return the first element of the array.
     */
    first: T;
    /**
     * Return the last element of the array.
     */
    last: T;
    /**
     * Return the last index in the array.
     */
    lastIndex: number;
    /**
     * Return true if and only if this array is empty.
     */
    isEmpty: boolean;
    /**
     * Return true if and only if this array is not empty.
     */
    isNotEmpty: boolean;
    /**
     * Swaps position of two elements from an array. Return a swapped array.
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
    /**
     * Removes whitespace from both sides of the string values in the object.
     */
    trimValues<T extends Record<string, any>>(o: T): T;
  }

  interface String {
    /**
     * Return true if string is empty.
     */
    isEmpty: boolean;
    /**
     * Return true if and only if this string is not empty.
     */
    isNotEmpty: boolean;
    /**
     * Return a string without spaces.
     */
    removeWhiteSpaces(): this;
  }
}

export {};
