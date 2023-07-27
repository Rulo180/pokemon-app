import { sortColumns } from './transformations';

const data: Record<string, number | string>[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
];

describe('sortColumns', () => {
  it('should sort the data in ascending order based on the specified column', () => {
    const sortedData = sortColumns(data, 'age', 'asc');
    expect(sortedData).toEqual([
      { id: 2, name: 'Bob', age: 25 },
      { id: 4, name: 'David', age: 28 },
      { id: 1, name: 'Alice', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]);
  });

  it('should sort the data in descending order based on the specified column', () => {
    const sortedData = sortColumns(data, 'age', 'desc');
    expect(sortedData).toEqual([
      { id: 3, name: 'Charlie', age: 35 },
      { id: 1, name: 'Alice', age: 30 },
      { id: 4, name: 'David', age: 28 },
      { id: 2, name: 'Bob', age: 25 },
    ]);
  });

  it('should return the original data if sortDirection is empty', () => {
    const sortedData = sortColumns(data, 'age', '');
    expect(sortedData).toEqual(data);
  });

  it('should handle sorting for string columns as well', () => {
    const stringData = [
      { id: 1, name: 'Bob', age: 30 },
      { id: 2, name: 'Alice', age: 25 },
      { id: 3, name: 'David', age: 35 },
    ];
    const sortedData = sortColumns(stringData, 'name', 'asc');
    expect(sortedData).toEqual([
      { id: 2, name: 'Alice', age: 25 },
      { id: 1, name: 'Bob', age: 30 },
      { id: 3, name: 'David', age: 35 },
    ]);
  });
});
