import { httpClient } from '@/api/httpClient';
import { POKEMON } from '@/api/endpoints';
import {
  Pokemon,
  PokemonSchema,
  PokemonsSchema,
  Pokemons,
} from '@/schemas/pokemonSchema';

export const DEFAULT_LIMIT = 30;

export const fetchPokemons = (
  offset: number,
  limit = DEFAULT_LIMIT,
): Promise<Pokemons> => {
  return httpClient.getAndValidate<Pokemons>(POKEMON, PokemonsSchema, {
    params: { limit, offset },
  });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return httpClient.getAndValidate<Pokemon>(
    `${POKEMON}/${name}`,
    PokemonSchema,
  );
};
