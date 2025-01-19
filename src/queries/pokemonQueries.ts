import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchPokemon, fetchPokemons } from '@/api/pokemonApis';

export const pokemonsQuery = () =>
  infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => fetchPokemons(pageParam),
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
