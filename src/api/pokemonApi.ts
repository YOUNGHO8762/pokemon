import { get } from '@/api';
import { Pokemon, PokemonsResponse } from '@/types/pokemon';
import { POKEMON_URL } from '@/constants/apiUrl';

export const fetchPokemons = async (offset: number) => {
  return get<PokemonsResponse>(POKEMON_URL, { params: { limit: 30, offset } });
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return get<Pokemon>(`${POKEMON_URL}/${name}`);
};
