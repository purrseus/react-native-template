/* eslint-disable no-extend-native */

Object.defineProperties(Array.prototype, {
  first: {
    get() {
      return this[0];
    },
  },
  last: {
    get() {
      return this[this.length - 1];
    },
  },
  lastIndex: {
    get() {
      return this.length - 1;
    },
  },
  isEmpty: {
    get() {
      return !this.length;
    },
  },
  isNotEmpty: {
    get() {
      return !!this.length;
    },
  },
});

Array.prototype.swap = function (indexA, indexB) {
  const array = [...this];
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
  return array;
};

export {};
