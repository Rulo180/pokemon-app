export type PokemonName = {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
};

export type PokemonStats = {
  HP: string;
  Attack: string;
  Defense: string;
  'Sp. Attack': string;
  'Sp. Defense': string;
  Speed: string;
};

export type Pokemon = {
  name: PokemonName;
  type: string[];
  stats: PokemonStats;
};

export type SerializedPokemon = Omit<Pokemon, 'name'> & {
  image: string;
  name: PokemonName['english'];
};
