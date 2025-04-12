import { useMemo } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import pokemonQueries from '@/queries/pokemonQueries';

export const usePokemonList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(pokemonQueries.list());

  const pokemons = useMemo(
    () => data.pages.flatMap(page => page.results),
    [data],
  );

  return {
    pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
