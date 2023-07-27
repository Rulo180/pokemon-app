/**
 * Converts a string to camel case syntax.
 * @param {string} str - The input string to be converted to camel case.
 * @returns {string} - The converted string in camel case syntax.
 */
const convertKeysToCamelCase = (str: string): string => {
  const transformedStr = str.replace(/[-_\s.]+(\w)/g, (_, letter) => letter.toUpperCase());
  return transformedStr.charAt(0).toLowerCase() + transformedStr.slice(1);
};

/**
 * Recursively flattens an object by converting nested properties into a single-level object.
 * @param {object} obj - The input object to be flattened.
 * @returns {object} - The flattened object.
 */
const flattenObject = (obj: object): object => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value));
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

/**
 * Orders an object's properties based on a given array of property names.
 * @param {object} obj - The input object whose properties need to be ordered.
 * @param {string[]} propertyOrder - The desired order of property names.
 * @returns {object} - The object with properties ordered according to the propertyOrder array.
 */
const orderObjectProperties = (obj: object, propertyOrder: string[]): object => {
  const orderedObj: any = {};

  propertyOrder.forEach((propertyName) => {
    if (obj.hasOwnProperty(propertyName)) {
      orderedObj[propertyName] = obj[propertyName];
    }
  });

  return orderedObj;
};

/**
 * Sorts an array of objects based on a given property and sort direction.
 *
 * @template T - The type of objects in the data array.
 * @param {T[]} data - The array of objects to be sorted.
 * @param {keyof T} sortColumn - The property by which to sort the objects.
 * @param {('asc' | 'desc' | '')} [sortDirection='asc'] - The sort direction, either "asc" for ascending, "desc" for descending, or an empty string for no sorting. Default is "asc".
 * @returns {T[]} - The sorted array of objects.
 */
const sortColumns = <T extends Record<string, any>>(
  data: T[],
  sortColumn: keyof T,
  sortDirection: 'asc' | 'desc' | '' = 'asc',
): T[] => {
  if (sortDirection === '') {
    return data;
  }
  return data.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (!isNaN(aValue) && !isNaN(bValue)) {
      const numericCompareValue = aValue - bValue;
      return sortDirection === 'asc' ? numericCompareValue : -numericCompareValue;
    }

    const compareValue = aValue.toString().localeCompare(bValue.toString());
    return sortDirection === 'asc' ? compareValue : -compareValue;
  });
};

export { convertKeysToCamelCase, flattenObject, orderObjectProperties, sortColumns };
