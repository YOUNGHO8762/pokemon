import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import pokemonQueries from '@/queries/pokemonQueries';
import { getStartIndexFromScroll } from '@/lib/utils';
import { DEFAULT_LIMIT } from '@/api/pokemonApis';
import { POKEMON_ITEM_SIZE } from '@/pages/Pokemons';

export const calculateLimit = (scrollY: string | null): number => {
  return scrollY
    ? getStartIndexFromScroll(Number(scrollY), POKEMON_ITEM_SIZE) +
        DEFAULT_LIMIT
    : DEFAULT_LIMIT;
};

export const useInfinitePokemons = () => {
  const scrollY = sessionStorage.getItem('scrollY');
  const limit = calculateLimit(scrollY);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(pokemonQueries.list(limit));

  const pokemons = data ? data.pages.flatMap(page => page.results) : [];

  return {
    pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
