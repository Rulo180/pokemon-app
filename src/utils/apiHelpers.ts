import { Pokemon, SerializedPokemon } from '@/types';

export const getPokemonImage = (pokemonId: number): string => {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId
    .toString()
    .padStart(3, '0')}.png`;
};

export const serializePokemon = (pokemon: Pokemon): SerializedPokemon => ({
  ...pokemon,
  image: getPokemonImage(pokemon.id),
  name: pokemon.name.english,
});

export const findPokemon = (pokemonData: Pokemon[], name: string) =>
  pokemonData.find((pokemon) => pokemon.name.english === name);

export const filterPokemons = (
  pokemons: Pokemon[],
  filterQueryName: string | RegExp,
): SerializedPokemon[] => {
  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.english.match(filterQueryName))
    .slice(0, 10)
    .map(serializePokemon);

  return filteredPokemons;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
