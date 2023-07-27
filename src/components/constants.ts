type PokemonColumn = {
  label: string;
  isSortable: boolean;
};

type PokemonColumns = {
  [key: string]: PokemonColumn;
};

export const POKEMON_COLUMNS: PokemonColumns = {
  id: {
    label: 'ID',
    isSortable: false,
  },
  name: {
    label: 'Name',
    isSortable: false,
  },
  type: {
    label: 'Type',
    isSortable: false,
  },
  hP: {
    label: 'HP',
    isSortable: true,
  },
  attack: {
    label: 'Attack',
    isSortable: true,
  },
  defense: {
    label: 'Defense',
    isSortable: true,
  },
  spAttack: {
    label: 'Speed Attack',
    isSortable: true,
  },
  spDefense: {
    label: 'Speed Defense',
    isSortable: true,
  },
  speed: {
    label: 'Speed',
    isSortable: true,
  },
  image: {
    label: 'Image',
    isSortable: false,
  },
};
