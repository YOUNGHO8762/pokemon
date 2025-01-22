import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { DEFAULT_LIMIT, fetchPokemon, fetchPokemons } from '@/api/pokemonApis';
import { PokemonsResponse } from '@/types/pokemon';

const extractNextPageOffset = (lastPage: PokemonsResponse) => {
  const nextPage = lastPage.next;
  return nextPage
    ? Number(new URL(nextPage).searchParams.get('offset'))
    : undefined;
};

export const pokemonsQuery = (limit = DEFAULT_LIMIT) =>
  infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => {
      return fetchPokemons(pageParam, limit);
    },
    initialPageParam: 0,
    getNextPageParam: extractNextPageOffset,
  });

export const pokemonQuery = (name: string) =>
  queryOptions({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
  });
