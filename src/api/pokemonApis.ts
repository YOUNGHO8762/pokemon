import { get } from '@/api/httpClient';
import { Pokemon, PokemonsResponse } from '@/types/pokemon';
import { POKEMON } from '@/api/endpoints';

export const DEFAULT_LIMIT = 30;

export const fetchPokemons = async (
  offset: number,
  limit = DEFAULT_LIMIT,
): Promise<PokemonsResponse> => {
  return get<PokemonsResponse>(POKEMON, { params: { limit, offset } });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return get<Pokemon>(`${POKEMON}/${name}`);
};
