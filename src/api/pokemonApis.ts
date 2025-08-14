import { httpClient } from '@/api/httpClient';
import { POKEMON } from '@/api/endpoints';
import { POKEMON_PAGE_SIZE } from '@/constants';
import {
  Pokemon,
  PokemonSchema,
  PokemonsSchema,
  Pokemons,
} from '@/schemas/pokemonSchema';

export const fetchPokemons = (
  offset: number,
  limit = POKEMON_PAGE_SIZE,
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
