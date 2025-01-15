import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  infiniteQueryOptions,
  QueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { fetchPokemons } from '@/api/pokemonApi';
import { getNthSubstring } from '@/lib/utils';

const pokemonsQuery = () =>
  infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => fetchPokemons(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.next;
      return nextPage
        ? Number(new URL(nextPage).searchParams.get('offset'))
        : undefined;
    },
  });

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureInfiniteQueryData(pokemonsQuery());
};

const getPokemonImageUrl = (url: string): string => {
  const id = getNthSubstring(url, '/', -2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const Pokemons = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(pokemonsQuery());
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const pokemons = useMemo(
    () => data.pages.flatMap((page) => page.results),
    [data]
  );

  const rowVirtualizer = useVirtualizer({
    count: pokemons.length,
    estimateSize: () => 40,
    overscan: 3,
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
    rowVirtualizer.scrollToOffset(scrollY ? Number(scrollY) : 0);
    sessionStorage.removeItem('scrollY');
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
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const pokemon = pokemons[virtualRow.index];
          return (
            <li
              key={virtualRow.index}
              className="flex items-center justify-center absolute top-0 left-1/2 cursor-pointer"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translate(-50%, ${virtualRow.start}px)`,
              }}
              onClick={() => handleNavigation(pokemon.name)}
            >
              <img
                src={getPokemonImageUrl(pokemon.url)}
                alt={pokemon.name}
                className="size-10 mr-2"
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
