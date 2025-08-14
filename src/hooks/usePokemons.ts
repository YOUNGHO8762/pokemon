import { useInfiniteVirtualizer } from '@/hooks/useInfiniteVirtualizer';
import { useInfinitePokemons } from '@/hooks/useInfinitePokemons';
import { SCROLL_RESTORE_KEY, POKEMON_ITEM_SIZE } from '@/constants';
import { useRestoreVirtualScroll } from '@/hooks/useRestoreVirtualScroll';

export const usePokemons = () => {
  const { pokemons, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePokemons();
  const { ref, virtualizer } = useInfiniteVirtualizer<HTMLDivElement>({
    count: pokemons.length,
    estimateSize: POKEMON_ITEM_SIZE,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  useRestoreVirtualScroll(virtualizer, SCROLL_RESTORE_KEY);

  return {
    pokemons,
    ref,
    virtualizer,
  };
};
