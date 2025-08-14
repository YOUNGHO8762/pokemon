import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchPokemon, fetchPokemons } from '@/api/pokemonApis';
import { POKEMON_PAGE_SIZE } from '@/constants';
import { Pokemons } from '@/schemas/pokemonSchema';

const extractNextPageOffset = (lastPage: Pokemons) => {
  const nextPage = lastPage.next;
  return nextPage
    ? Number(new URL(nextPage).searchParams.get('offset'))
    : undefined;
};

const pokemonQueries = {
  all: () => ['pokemon'],
  lists: () => [...pokemonQueries.all(), 'list'],
  list: (limit = POKEMON_PAGE_SIZE) =>
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
      queryKey: [...pokemonQueries.details(), name],
      queryFn: () => fetchPokemon(name),
    }),
};

export default pokemonQueries;
