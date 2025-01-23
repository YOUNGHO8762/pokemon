import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { DEFAULT_LIMIT, fetchPokemon, fetchPokemons } from '@/api/pokemonApis';
import { PokemonsResponse } from '@/types/pokemon';

const extractNextPageOffset = (lastPage: PokemonsResponse) => {
  const nextPage = lastPage.next;
  return nextPage
    ? Number(new URL(nextPage).searchParams.get('offset'))
    : undefined;
};

const pokemonQueries = {
  all: () => ['pokemon'],
  lists: () => [...pokemonQueries.all(), 'list'],
  list: (limit = DEFAULT_LIMIT) =>
    infiniteQueryOptions({
      queryKey: [...pokemonQueries.lists()],
      queryFn: ({ pageParam }) => {
        return fetchPokemons(pageParam, limit);
      },
      initialPageParam: 0,
      getNextPageParam: extractNextPageOffset,
    }),
  details: () => [...pokemonQueries.all(), 'detail'],
  detail: (name: string) =>
    queryOptions({
      queryKey: [...pokemonQueries.lists(), name],
      queryFn: () => fetchPokemon(name),
    }),
};

export default pokemonQueries;
