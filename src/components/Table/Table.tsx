import React, { useEffect, useState } from 'react';

import { SerializedPokemon } from '@/types';
import {
  convertKeysToCamelCase,
  flattenObject,
  orderObjectProperties,
  sortColumns,
} from '@/utils/transformations';

import EmptyState from './EmptyState';
import { TableImplementetion } from './TableImplementation';

export type Props = {
  data: SerializedPokemon[];
  columns: string[];
};

export type SortDirections = 'asc' | 'desc' | '';

export const Table = ({ data, columns }: Props) => {
  const [sortColumn, setSortColumn] = useState<keyof SerializedPokemon | ''>('');
  const [sortDirection, setSortDirection] = useState<SortDirections>('asc');
  const [tableData, setTableData] = useState<SerializedPokemon[]>([]);

  useEffect(() => {
    if (data) {
      let newTableData: SerializedPokemon[] = data.map((pokemon) => {
        const flattenedPokemon = flattenObject(pokemon);
        const formatedPokemon = Object.keys(flattenedPokemon).reduce((acc, key) => {
          const formatedKey = convertKeysToCamelCase(key);
          if (flattenedPokemon.hasOwnProperty(key)) {
            acc[formatedKey as keyof typeof acc] =
              flattenedPokemon[key as keyof typeof flattenedPokemon];
          }
          return acc;
        }, {} as Record<keyof SerializedPokemon, any>);
        return orderObjectProperties(formatedPokemon, columns) as SerializedPokemon;
      });
      if (sortColumn) {
        newTableData = sortColumns(newTableData, sortColumn, sortDirection);
      }
      setTableData(newTableData);
    }
  }, [columns, data, sortColumn, sortDirection]);

  const handleOnSort = (column: keyof SerializedPokemon | '') => {
    if (column === sortColumn) {
      setSortDirection((currentSortDirection) => {
        if (currentSortDirection === 'asc') return 'desc';
        if (currentSortDirection === 'desc') return '';
        return 'asc';
      });
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  if (data.length === 0) {
    return (
      <EmptyState
        title="No data to display"
        message="Oops! Something went wrong. Please try again or search for something else."
      />
    );
  }

  return (
    <TableImplementetion
      data={tableData}
      columns={columns}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={handleOnSort}
    />
  );
};
