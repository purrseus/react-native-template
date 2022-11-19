/* eslint-disable no-extend-native */

String.prototype.isEmpty = function () {
  return !this.trim().length;
};

String.prototype.removeWhiteSpaces = function () {
  return this.replace(/\s+/g, '');
};

export {};
