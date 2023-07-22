import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import getConfig from 'next/config';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

import { Cards } from '@/components/Cards';
import { Container } from '@/components/Container';
import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table';
import { SerializedPokemon } from '@/types';

type Views = 'cards' | 'table' | 'list';

const Home = ({ version }: { version: string }) => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<Views>('cards');

  const { data: response } = useSWR<AxiosResponse<SerializedPokemon[]>>(`pokemons-${search}`, () =>
    axios(`/api/pokemons`),
  );

  const handleSearch = useCallback((event) => {
    setView('cards');
    setSearch(event.target.value);
  }, []);

  const renderContent = () => {
    if (!response) {
      return (
        <div className="flex justify-center">
          <Spinner />
        </div>
      );
    }
    return view === 'cards' ? <Cards data={response.data} /> : <Table />;
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
