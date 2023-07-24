import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { SerializedPokemon } from '@/types';
export type Props = { data: SerializedPokemon[]; headers: string[] };

const transformDataForTable = (
  data: SerializedPokemon[],
  headers: string[],
  mapFunction = (item: SerializedPokemon) => item,
) => {
  const flattenObject = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value));
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  return data.map((item) => {
    const transformedItem = mapFunction(item);

    // Flatten all nested properties
    const flattenedItem = flattenObject(transformedItem);

    // Create an object containing only the desired properties (headers)
    const tableItem = headers.reduce((acc, header) => {
      acc[header] = flattenedItem[header];
      return acc;
    }, {});

    return tableItem;
  });
};

export const Table = ({ data, headers }: Props) => {
export const Table = () => {
  return <div>Implement me!</div>;

  const tableData = transformDataForTable(data, headers);

  return (
    <div className="">
      <table className="table-fixed w-full border-collapse ">
        <thead className="bg-slate-100">
          <tr className="text-left border-b border-gray-300">
            {headers.map((header) => (
              <th
                key={header}
                className="p-4 pr-8 pt-0 pb-3 cursor-pointer"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((pokemon) => {
            return (
              <tr key={pokemon.id} className="bg-white">
                {Object.keys(pokemon).map((key) => (
                  <td key={pokemon.id} className="p-4 border-b border-gray-300">
                    {key === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pokemon[key]} aria-label={pokemon.name} alt={pokemon.name} />
                    ) : (
                      pokemon[key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
