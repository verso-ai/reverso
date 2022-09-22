export const classNamesConcat = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

export const findMatch = (data: any[], find: any, defaultValue: any): any => {
  const founded = data.findIndex(el => el === find);
  return founded >= 0 ? find : defaultValue;
};

export const objectsToArray = (object: object) => {
  let result: any[] = [];

  Object.values(object).forEach(value => {
    if (typeof value === 'string') {
      result = [...result, value];
    } else if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value !== null
    ) {
      result = [...result, ...objectsToArray(value)];
    }

    return undefined;
  });

  return result;
};

export const objectsToString = (object: object) => {
  return objectsToArray(object).join(' ');
};
