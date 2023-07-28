import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { Chip } from '@/components/Chip';
import { SerializedPokemon } from '@/types';
import { fadeInRows } from '@/utils/animations';

import CaretDownIcon from '../CaretDownIcon';
import CaretUpIcon from '../CaretUpIcon';
import { POKEMON_COLUMNS } from '../constants';
import { SortDirections } from './Table';

type TableHeadersProps = {
  columns: string[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc' | '';
  onSort: (arg0: keyof SerializedPokemon | '') => void;
};

const TableHeaders: React.FC<TableHeadersProps> = ({
  columns,
  onSort,
  sortColumn,
  sortDirection,
}) => {
  return (
    <thead className="bg-slate-300" data-testid="table-header">
      <tr className="text-center">
        {columns.map((column: string) => {
          const { isSortable, label } = POKEMON_COLUMNS[column];
          return (
            <th
              key={column}
              className={`p-4 pt-0 pb-3 h-full ${isSortable ? 'cursor-pointer' : ''}`}
              scope="col"
              onClick={() => {
                if (onSort && isSortable) {
                  onSort(column as keyof SerializedPokemon | '');
                }
              }}
            >
              <div className="flex items-center">
                {isSortable ? (
                  <div className="flex flex-col pr-1">
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
                {label}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export type Props = {
  data: SerializedPokemon[];
  columns: string[];
  sortColumn: string;
  sortDirection: SortDirections;
  onSort: (arg0: keyof SerializedPokemon | '') => void;
};

export const TableImplementetion = ({
  data,
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: Props) => {
  return (
    <table data-testid="table-implementation" className="table-fixed w-full border-collapse">
      <TableHeaders
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <tbody>
        {data.map((pokemon: SerializedPokemon, index) => {
          return (
            <Link key={`${pokemon.id}-row`} href={`/pokemon/${pokemon.name}`}>
              <motion.tr
                key={index}
                className={`bg-white text-center ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}
                variants={fadeInRows}
                data-testid="pokemon-row"
              >
                {Object.keys(pokemon).map((key) => (
                  <td key={`${pokemon}-${key}-cell`} className="p-4">
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
              </motion.tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  );
};
