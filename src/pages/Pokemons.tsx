import { useNavigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import pokemonQueries from '@/queries/pokemonQueries';
import { DEFAULT_LIMIT } from '@/api/pokemonApis';
import { getNthSubstring, getStartIndexFromScroll } from '@/lib/utils';
import { usePokemonList } from '@/hooks/usePokemons';
import { useInfiniteVirtualizer } from '@/hooks/useInfiniteVirtualizer';
import { useRestoreVirtualScroll } from '@/hooks/useRestoreVirtualScroll';

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
  const { pokemons, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonList();
  const { ref, virtualizer } = useInfiniteVirtualizer<HTMLDivElement>({
    totalCount: pokemons.length,
    itemHeight: POKEMON_ITEM_SIZE,
    overscan: 20,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  useRestoreVirtualScroll(virtualizer, 'scrollY');
  const navigate = useNavigate();

  const handleNavigation = (name: string) => {
    navigate(name, { state: virtualizer.scrollElement?.scrollTop });
  };

  return (
    <div ref={ref} className="h-screen w-full overflow-auto bg-gray-100">
      <ul
        className="relative w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map(({ index, size, start }) => {
          const pokemon = pokemons[index];
          return (
            <li
              key={index}
              className="absolute left-1/2 top-0 flex cursor-pointer items-center justify-center"
              style={{
                height: `${size}px`,
                transform: `translate(-50%, ${start}px)`,
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
