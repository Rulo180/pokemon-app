import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import getConfig from 'next/config';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { Table } from '@/components/Table/Table';
import { Cards } from '@/components/Cards';
import { Container } from '@/components/Container';
import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table/Table';
import { SerializedPokemon } from '@/types';
import {
  convertKeysToCamelCase,
  flattenObject,
  orderObjectProperties,
  sortColumns,
} from '@/utils/transformations';

type Views = 'cards' | 'table' | 'list';
type SortDirections = 'asc' | 'desc';

const Home = ({ version }: { version: string }) => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<Views>('cards');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirections>('asc');
  const [tableData, setTableData] = useState([]);

  const { data: response } = useSWR<AxiosResponse<SerializedPokemon[]>>(
    `pokemons-${search}`,
    () => {
      if (search) {
        const regex = new RegExp(search, 'i');
        return axios(`/api/pokemons?name=${encodeURIComponent(regex.source)}`);
      }
      return axios(`/api/pokemons`);
    },
  );

  const columns = useMemo(
    () => [
      'id',
      'image',
      'name',
      'type',
      'hP',
      'attack',
      'defense',
      'spAttack',
      'spDefense',
      'speed',
    ],
    [],
  );

  useEffect(() => {
    if (response?.data) {
      let newTableData = response?.data.map((pokemon) => {
        const flattenedPokemon = flattenObject(pokemon);
        const formatedPokemon = Object.keys(flattenedPokemon).reduce((acc, key) => {
          const formatedKey = convertKeysToCamelCase(key);
          if (flattenedPokemon.hasOwnProperty(key)) {
            acc[formatedKey] = flattenedPokemon[key];
          }
          return acc;
        }, {});
        return orderObjectProperties(formatedPokemon, columns);
      });
      if (sortColumn) {
        newTableData = sortColumns(newTableData, sortColumn, sortDirection);
      }
      setTableData(newTableData);
    }
  }, [columns, response?.data, sortColumn, sortDirection]);

  const handleOnSort = (column) => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    if (column === sortColumn) {
      setSortDirection(newSortDirection);
    }
    setSortColumn(column);
  };

  const handleSearch = useCallback((event) => {
    setView('cards');
    setSearch(event.target.value);
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  const renderContent = () => {
    if (!response) {
      return (
        <div className="flex justify-center">
          <Spinner />
        </div>
      );
    }
    return view === 'cards' ? (
      <Cards data={response.data} />
    ) : (
      <Table
        data={tableData}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleOnSort}
      />
    );
  };

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Head>
        <title>Pokemon | Explore</title>
      </Head>

      <Container>
        <header className="my-10">
          <div className="text-2xl">
            Pokedex <small className="text-sm">{version}</small>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <input
                className="border border-gray-300 rounded-md px-2 py-1 my-2 text-sm"
                type="text"
                placeholder="Search for a pokemon"
                onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                value={search}
              />
            </div>
            <div className="text-right">
              <button
                className={`rounded-md ${view === 'cards' && 'bg-sky-100'} pd-2 px-4`}
                onClick={() => {
                  setView('cards');
                }}
              >
                Cards
              </button>{' '}
              <button
                className={`rounded-md ${view === 'table' && 'bg-sky-100'} pd-2 px-4`}
                onClick={() => {
                  setView('table');
                }}
              >
                Table
              </button>
            </div>
          </div>
        </header>
        {renderContent()}
      </Container>
    </motion.div>
  );
};

Home.getInitialProps = () => {
  return {
    version: getConfig().publicRuntimeConfig.pkg.version,
  };
};

export default Home;
