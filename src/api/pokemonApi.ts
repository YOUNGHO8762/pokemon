import { axiosInstance } from '@/api/axiosInstance';
import { Pokemon, PokemonsResponse, PokemonSummary } from '@/types/pokemon';
import { POKEMON_URL } from '@/constants/apiUrl';

export const fetchPokemons = async (): Promise<PokemonSummary[]> => {
  const { data } = await axiosInstance.get<PokemonsResponse>(POKEMON_URL, {
    params: { limit: 10 },
  });
  return data.results;
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await axiosInstance.get<Pokemon>(`${POKEMON_URL}/${name}`);
  return data;
};
