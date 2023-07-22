import { NextApiRequest, NextApiResponse } from 'next';

import pokemonData from '@/pokemon.json';
import { filterPokemons } from '@/utils/apiHelpers';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filterQueryName = req.query.name ? new RegExp(String(req.query.name), 'i') : /.*/;

  const filteredPokemons = filterPokemons(pokemonData, filterQueryName);

  res.status(200).json(filteredPokemons);
};
