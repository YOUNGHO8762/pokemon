import { useInfiniteVirtualizer } from '@/hooks/useInfiniteVirtualizer';
import { useInfinitePokemons } from '@/hooks/useInfinitePokemons';
import { useRestoreVirtualScroll } from '@/hooks/useRestoreVirtualScroll';
import { POKEMON_ITEM_SIZE } from '@/pages/Pokemons';

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
  useRestoreVirtualScroll(virtualizer, 'scrollY');

  return {
    pokemons,
    ref,
    virtualizer,
  };
};
