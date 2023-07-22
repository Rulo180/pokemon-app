import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Chip } from '@/components/Chip';
import { Container } from '@/components/Container';
import { Spinner } from '@/components/Spinner';
import { SerializedPokemon } from '@/types';
import { fadeInUp, stagger } from '@/utils/animations';

const Pokemon: React.FC = () => {
  const { query, isReady } = useRouter();
  const { data: response, error } = useSWR<AxiosResponse<SerializedPokemon>>(
    isReady ? `/api/pokemons/${query.name || ''}` : null,
    axios,
  );

  if (error) {
    return (
      <div className="pokemon-details">
        <div className="text-xl">Error while searching for pokemon</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Pokemon | {response?.data?.name ? response?.data.name : 'Pokemon Details'}</title>
      </Head>
      <Container>
        <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
          <header className="my-5 text-2xl">
            <Link href="/">← Back</Link>
          </header>

          {response?.data ? (
            <div className="flex flex-col items-center">
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-80 h-80 border-slate-300 border p-2 bg-white rounded-lg drop-shadow-2xl"
                src={response.data.image}
                alt={response.data.name}
                aria-label={response.data.name}
              />

              {/* Name */}
              <div className="text-2xl my-10">{response.data.name}</div>

              {/* Stats */}
              <motion.div className="max-w-md w-full" variants={stagger(0.08)}>
                <div>
                  <ul className="flex flex-col gap-1">
                    {Object.entries(response.data.stats).map(([key, value]) => (
                      <motion.li key={key} variants={fadeInUp} className="flex items-center">
                        <div className="font-bold">{key}</div>
                        <div className="ml-auto">
                          <Chip>{value}</Chip>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ) : (
            <Spinner />
          )}
        </motion.div>
      </Container>
    </>
  );
};

export default Pokemon;
