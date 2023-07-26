const convertKeysToCamelCase = (str: string): string => {
  const transformedStr = str.replace(/[-_\s.]+(\w)/g, (_, letter) => letter.toUpperCase());
  return transformedStr.charAt(0).toLowerCase() + transformedStr.slice(1);
};

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

const orderObjectProperties = (obj, propertyOrder) => {
  const orderedObj = {};

  propertyOrder.forEach((propertyName) => {
    if (obj.hasOwnProperty(propertyName)) {
      orderedObj[propertyName] = obj[propertyName];
    }
  });

  return orderedObj;
};

const transformPokemonDataForTable = (data) => {
  data.map((pokemon) => {
    const flattenedPokemon = flattenObject(pokemon);
    const formatedPokemon = Object.keys(flattenedPokemon).reduce((acc, key) => {
      const formatedKey = convertKeysToCamelCase(key);
      if (flattenedPokemon.hasOwnProperty(key)) {
        acc[formatedKey] = flattenedPokemon[key];
      }
      return acc;
    }, {});
    return formatedPokemon;
  });
};

/**
 * Sorts an array of objects based on a given property and sort direction.
 * @param {T[]} data - The array of objects to be sorted.
 * @param {keyof T} sortColumn - The property by which to sort the objects.
 * @param {('asc' | 'desc')} sortDirection - The sort direction, either "asc" for ascending or "desc" for descending. Default is "asc".
 * @returns {T[]} - The sorted array of objects.
 */
const sortColumns = <T extends Record<string, any>>(
  data: T[],
  sortColumn: keyof T,
  sortDirection: 'asc' | 'desc' = 'asc',
): T[] => {
  return data.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const compareValue = aValue.localeCompare(bValue);

    return sortDirection === 'asc' ? compareValue : -compareValue;
  });
};

export {
  convertKeysToCamelCase,
  flattenObject,
  orderObjectProperties,
  sortColumns,
  transformPokemonDataForTable,
};
