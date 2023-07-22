import { NextApiRequest, NextApiResponse } from 'next';

import pokemonData from '@/pokemon.json';
import { findPokemon, serializePokemon } from '@/utils/apiHelpers';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (!name) {
    res.status(400).send('You must provide a name in order to find a pokemon');
    return;
  }

  const sanitizedName = Array.isArray(name) ? name[0] : name;
  const pokemon = findPokemon(pokemonData, sanitizedName);

  if (!pokemon) {
    res.status(404).send(`Pokemon ${name} not found`);
    return;
  }

  res.status(200).json(serializePokemon(pokemon));
};
