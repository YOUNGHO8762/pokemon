import { useNavigate } from 'react-router';
import { getNthSubstring } from '@/lib/utils';
import { usePokemons } from '@/hooks/usePokemons';

export const POKEMON_ITEM_SIZE = 40;

export const getPokemonImageUrl = (url: string): string => {
  const id = getNthSubstring(url, '/', -2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const Pokemons = () => {
  const { pokemons, ref, virtualizer } = usePokemons();
  const navigate = useNavigate();

  const handlePokemonClick = (name: string) => {
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
              className="absolute left-1/2 top-0"
              style={{
                height: `${size}px`,
                transform: `translate(-50%, ${start}px)`,
              }}
            >
              <button
                className="flex items-center justify-center"
                onClick={() => handlePokemonClick(pokemon.name)}
                aria-label={`${pokemon.name} 상세보기`}
              >
                <img
                  src={getPokemonImageUrl(pokemon.url)}
                  alt=""
                  style={{
                    width: `${POKEMON_ITEM_SIZE}px`,
                    height: `${POKEMON_ITEM_SIZE}px`,
                  }}
                  className="mr-2"
                />
                {pokemon.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pokemons;
