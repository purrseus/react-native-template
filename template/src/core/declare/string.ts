/* eslint-disable no-extend-native */

Object.defineProperties(String.prototype, {
  isEmpty: {
    get() {
      return !this.trim().length;
    },
  },
});

String.prototype.removeWhiteSpaces = function () {
  return this.replace(/\s+/g, '');
};

export {};
