import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { QueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import pokemonQueries from '@/queries/pokemonQueries';
import { DEFAULT_LIMIT } from '@/api/pokemonApis';
import { getNthSubstring, getStartIndexFromScroll } from '@/lib/utils';

const POKEMON_ITEM_SIZE = 40;

export const getPokemonImageUrl = (url: string): string => {
  const id = getNthSubstring(url, '/', -2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const calculateLimit = (scrollY: string | null): number => {
  return scrollY
    ? getStartIndexFromScroll(Number(scrollY), POKEMON_ITEM_SIZE) +
        DEFAULT_LIMIT
    : DEFAULT_LIMIT;
};

export const loader = (queryClient: QueryClient) => async () => {
  const scrollY = sessionStorage.getItem('scrollY');
  const limit = calculateLimit(scrollY);
  await queryClient.ensureInfiniteQueryData(pokemonQueries.list(limit));
};

const Pokemons = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(pokemonQueries.list());
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const pokemons = useMemo(
    () => data.pages.flatMap(page => page.results),
    [data],
  );

  const rowVirtualizer = useVirtualizer({
    count: pokemons.length,
    estimateSize: () => POKEMON_ITEM_SIZE,
    overscan: 5,
    getScrollElement: () => parentRef.current,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= pokemons.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    pokemons.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);

  useEffect(() => {
    const scrollY = sessionStorage.getItem('scrollY');

    if (!scrollY) {
      return;
    }

    (async () => {
      await rowVirtualizer.scrollToOffset(Number(scrollY));
      sessionStorage.removeItem('scrollY');
    })();
  }, [rowVirtualizer]);

  const handleNavigation = (name: string) => {
    navigate(name, { state: rowVirtualizer.scrollElement?.scrollTop });
  };

  return (
    <div ref={parentRef} className="h-screen w-full overflow-auto bg-gray-100">
      <ul
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const pokemon = pokemons[virtualRow.index];
          return (
            <li
              key={virtualRow.index}
              className="absolute left-1/2 top-0 flex cursor-pointer items-center justify-center"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translate(-50%, ${virtualRow.start}px)`,
              }}
              onClick={() => handleNavigation(pokemon.name)}
            >
              <img
                src={getPokemonImageUrl(pokemon.url)}
                alt={pokemon.name}
                style={{
                  width: `${POKEMON_ITEM_SIZE}px`,
                  height: `${POKEMON_ITEM_SIZE}px`,
                }}
                className="mr-2"
              />
              {pokemon.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pokemons;
