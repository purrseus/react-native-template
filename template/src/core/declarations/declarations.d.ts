/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  /**
   * Prints a string representation of the object to the console.
   * @param args everything you want to display on the console.
   */
  declare function print(...args: any[]): void;
  /**
   * Return true if and only if the current OS is Android.
   */
  function isAndroid(): boolean;

  /**
   * Return true if and only if the current OS is iOS.
   */
  function isIos(): boolean;

  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string with beautiful format.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  function referenceTypeFormatter(
    value: Parameters<typeof JSON.stringify>[0],
    space?: Parameters<typeof JSON.stringify>[2],
  ): ReturnType<typeof JSON.stringify>;

  /**
   * Generate duration in milliseconds.
   * @param time Numeric units in milliseconds.
   */
  function duration(
    time: Partial<Record<'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds', number>>,
  ): number;

  /**
   * It will cause the program to pause for a specified amount of time in milliseconds.
   * @param timeout Number of milliseconds want to wait.
   */
  function wait(timeout?: number): Promise<void>;

  /**
   * Create an ascending order array.
   * @param length The length of the array.
   */
  function createAscendingOrderArray(length: number): number[];

  // -------------------------------------------------------------------------------------------

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
     * @param indexA The fist index of element to swap position.
     * @param indexB The second index of element to swap position.
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
     * Return true if and only if this string is empty.
     */
    isEmpty: boolean;

    /**
     * Return true if and only if this string is not empty.
     */
    isNotEmpty: boolean;

    /**
     * Return a string without spaces.
     */
    removeWhiteSpaces(): string;

    /**
     * Return a capitalized string.
     */
    capitalize(): string;

    /**
     * Return a uncapitalized string.
     */
    uncapitalize(): string;
  }
}

export {};
