import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { DEFAULT_LIMIT, fetchPokemon, fetchPokemons } from '@/api/pokemonApis';
import { POKEMON_ITEM_SIZE } from '@/pages/Pokemons';

function calculateLimit(scrollY: string | null): number {
  if (!scrollY) {
    return DEFAULT_LIMIT;
  }

  return Math.round(Number(scrollY) / POKEMON_ITEM_SIZE) + DEFAULT_LIMIT;
}

export const pokemonsQuery = () =>
  infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => {
      const scrollY = sessionStorage.getItem('scrollY');
      const limit = calculateLimit(scrollY);
      return fetchPokemons(pageParam, limit);
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.next;
      return nextPage
        ? Number(new URL(nextPage).searchParams.get('offset'))
        : undefined;
    },
  });

export const pokemonQuery = (name: string) =>
  queryOptions({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
  });
