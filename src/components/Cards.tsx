import { motion } from 'framer-motion';
import Link from 'next/link';

import { Chip } from '@/components/Chip';
import { SerializedPokemon } from '@/types';
import { fadeInUp } from '@/utils/animations';

export type Props = { data: SerializedPokemon[] };

export const Cards = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap gap-10 justify-between">
      {data.map((pokemon) => (
        <Link
          key={pokemon.id}
          href={`/pokemon/${pokemon.name}`}
          data-testid={`pokemon-${pokemon.id}`}
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1 }}
            className="rounded-lg bg-slate-100 border-slate-300 border p-5 max-w-md cursor-pointer flex-none w-6/12"
          >
            <div>
              {/* Name */}
              <div data-testid={`pokemon-${pokemon.id}-name`} className="text-2xl">
                {pokemon.name}
              </div>

              <div className="flex items-center">
                {/* Types */}
                <div className="flex gap-1 flex-col items-start">
                  {pokemon.type?.map((type) => (
                    <Chip key={type}>{type}</Chip>
                  ))}
                </div>

                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  style={{ maxHeight: '120px' }}
                  className="ml-auto rounded-lg border-slate-300 border p-2 bg-white"
                  src={pokemon.image}
                  aria-label={pokemon.name}
                  alt={pokemon.name}
                />
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};
