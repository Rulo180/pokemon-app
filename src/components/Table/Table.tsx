import Link from 'next/link';
import React, { useState } from 'react';

import { Chip } from '@/components/Chip';
import { SerializedPokemon } from '@/types';

import CaretDownIcon from '../CaretDownIcon';
import CaretUpIcon from '../CaretUpIcon';
import { POKEMON_COLUMNS } from '../constants';

export type Props = {
  data: SerializedPokemon[];
  columns: string[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (arg0: string) => void;
};

export const Table = ({ data, columns, sortColumn, sortDirection, onSort }: Props) => {
  const tableHeaders = columns.map((column) => {
    const { isSortable, label } = POKEMON_COLUMNS[column];
    return (
      <th
        key={column}
        className={`p-4 pt-0 pb-3 h-full ${isSortable ? 'cursor-pointer' : ''}`}
        scope="col"
        onClick={() => {
          if (onSort && isSortable) {
            onSort(column);
          }
        }}
      >
        <div className="flex items-center">
          {label}
          {isSortable ? (
            <div className="flex flex-col">
              <CaretUpIcon
                color={sortColumn === column && sortDirection === 'asc' ? undefined : 'grey'}
                width={12}
                height={12}
              />
              <CaretDownIcon
                color={sortColumn === column && sortDirection === 'desc' ? undefined : 'grey'}
                width={12}
                height={12}
              />
            </div>
          ) : null}
        </div>
      </th>
    );
  });

  // const sortIcon = sortDirection === 'asc' ? <CaretUpIcon /> : <CaretDownIcon />;
  return (
    <div className="">
      <table className="table-fixed w-full border-collapse ">
        <thead className="bg-slate-100">
          <tr className="text-center border-b border-gray-300">{tableHeaders}</tr>
        </thead>
        <tbody>
          {data.map((pokemon) => {
            return (
              <Link key={`${pokemon.id}-row`} href={`/pokemon/${pokemon.name}`}>
                <tr className="bg-white text-center">
                  {Object.keys(pokemon).map((key) => (
                    <td key={`${pokemon}-${key}-cell`} className="p-4 border-b border-gray-300">
                      {key === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={pokemon[key] as string}
                          aria-label={pokemon.name}
                          alt={pokemon.name as string}
                        />
                      ) : key === 'type' ? (
                        pokemon[key].map((type: string) => (
                          <div key={`${pokemon.id}-${type}`} className="py-1">
                            <Chip size="sm">{type}</Chip>
                          </div>
                        ))
                      ) : (
                        pokemon[key]
                      )}
                    </td>
                  ))}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
