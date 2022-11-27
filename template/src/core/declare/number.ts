/* eslint-disable no-extend-native */

Object.defineProperties(Number.prototype, {
  isOdd: {
    get() {
      return this % 2 !== 0;
    },
  },
  isEven: {
    get() {
      return this % 2 === 0;
    },
  },
});

export {};
