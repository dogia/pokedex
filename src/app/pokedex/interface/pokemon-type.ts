type PokemonType = 'normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'|'ground'|'flying'|'psychic'|'bug'|'rock'|'ghost'|'dragon'|'dark'|'steel'|'fairy';

export interface PokemonTypeInterface {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }