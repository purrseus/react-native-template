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

Number.prototype.isValidIndex = function (array) {
  const number = this.valueOf();
  return Number.isInteger(number) && number >= 0 && number < array.length;
};

export {};
