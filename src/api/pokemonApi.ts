import { axiosInstance } from '@/api/axiosInstance';
import { Pokemon, PokemonsResponse } from '@/types/pokemon';
import { POKEMON_URL } from '@/constants/apiUrl';

export const fetchPokemons = async (
  offset: number
): Promise<PokemonsResponse> => {
  const { data } = await axiosInstance.get<PokemonsResponse>(POKEMON_URL, {
    params: { limit: 20, offset },
  });
  return data;
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await axiosInstance.get<Pokemon>(`${POKEMON_URL}/${name}`);
  return data;
};
