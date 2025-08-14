import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import pokemonQueries from '@/queries/pokemonQueries';
import { POKEMON_PAGE_SIZE, POKEMON_ITEM_SIZE, SCROLL_RESTORE_KEY } from '@/constants';
import { getScrollPosition } from '@/lib/scrollRestore';
import { getStartIndexFromScroll } from '@/lib/utils';

export const calculateLimit = (scrollY: string | null): number => {
  return scrollY
    ? getStartIndexFromScroll(Number(scrollY), POKEMON_ITEM_SIZE) +
        POKEMON_PAGE_SIZE
    : POKEMON_PAGE_SIZE;
};

export const useInfinitePokemons = () => {
  const scrollY = getScrollPosition(SCROLL_RESTORE_KEY);
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
