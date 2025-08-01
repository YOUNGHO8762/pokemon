import { useNavigate } from 'react-router';
import { getNthSubstring } from '@/lib/utils';
import { usePokemonList } from '@/hooks/usePokemons';
import { useInfiniteVirtualizer } from '@/hooks/useInfiniteVirtualizer';
import { useRestoreVirtualScroll } from '@/hooks/useRestoreVirtualScroll';

export const POKEMON_ITEM_SIZE = 40;

export const getPokemonImageUrl = (url: string): string => {
  const id = getNthSubstring(url, '/', -2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const Pokemons = () => {
  const { pokemons, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonList();
  const { ref, virtualizer } = useInfiniteVirtualizer<HTMLDivElement>({
    count: pokemons.length,
    estimateSize: POKEMON_ITEM_SIZE,
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
