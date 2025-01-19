import { get } from '@/api/httpClient';
import { Pokemon, PokemonsResponse } from '@/types/pokemon';
import { POKEMON } from '@/api/endpoints';

export const fetchPokemons = async (
  offset: number,
): Promise<PokemonsResponse> => {
  return get<PokemonsResponse>(POKEMON, { params: { limit: 30, offset } });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return get<Pokemon>(`${POKEMON}/${name}`);
};
