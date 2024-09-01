import { PokemonResourceInterface } from "./pokemon-resource";

export interface PokemonApiResultInterface {
  count: number;
  next: string;
  previous: string;
  results: Array<PokemonResourceInterface>;
}
