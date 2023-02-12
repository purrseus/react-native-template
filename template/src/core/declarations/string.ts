/* eslint-disable no-extend-native */

Object.defineProperties(String.prototype, {
  isEmpty: {
    get() {
      return !this.trim().length;
    },
  },
  isNotEmpty: {
    get() {
      return !!this.trim().length;
    },
  },
});

String.prototype.removeWhiteSpaces = function () {
  return this.replace(/\s+/g, '');
};

String.prototype.capitalize = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.uncapitalize = function () {
  return `${this[0].toLowerCase()}${this.slice(1)}`;
};

export {};
