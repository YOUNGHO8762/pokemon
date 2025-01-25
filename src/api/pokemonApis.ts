import { getWithSchema } from '@/api/httpClient';
import { POKEMON } from '@/api/endpoints';
import {
  Pokemon,
  pokemonSchema,
  PokemonsResponse,
  pokemonsResponseSchema,
} from '@/schemas/pokemonSchema';

export const DEFAULT_LIMIT = 30;

export const fetchPokemons = (
  offset: number,
  limit = DEFAULT_LIMIT,
): Promise<PokemonsResponse> => {
  return getWithSchema<PokemonsResponse>(POKEMON, pokemonsResponseSchema, {
    params: { limit, offset },
  });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return getWithSchema<Pokemon>(`${POKEMON}/${name}`, pokemonSchema);
};
