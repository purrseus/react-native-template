Object.trimValues = function (object) {
  type ObjType = typeof object;
  return Object.keys(object).reduce(
    (obj: ObjType, key) => ({
      ...obj,
      [key]: typeof object[key] === 'string' ? object[key].trim() : object[key],
    }),
    {} as ObjType,
  ) as unknown as ObjType;
};

export {};
