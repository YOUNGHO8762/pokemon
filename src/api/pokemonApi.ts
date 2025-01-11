import { get } from '@/api/axiosInstance';
import { Pokemon, PokemonsResponse } from '@/types/pokemon';
import { POKEMON_URL } from '@/constants/apiUrl';

export const fetchPokemons = async (offset: number) => {
  return get<PokemonsResponse>(POKEMON_URL, { limit: 20, offset });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return get<Pokemon>(`${POKEMON_URL}/${name}`);
};
