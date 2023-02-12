Object.trimValues = function (object) {
  const trimmedObject = {} as typeof object;

  for (const key in object) {
    trimmedObject[key] = typeof object[key] === 'string' ? object[key].trim() : object[key];
  }

  return trimmedObject;
};

export {};
