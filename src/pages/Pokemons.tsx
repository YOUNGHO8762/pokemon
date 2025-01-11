import { useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import {
  infiniteQueryOptions,
  QueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { fetchPokemons } from '@/api/pokemonApi';
import useInView from '@/hooks/useInView';

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
  const id = url.split('/').slice(-2, -1)[0];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const Pokemons = () => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery(pokemonsQuery());
  const { ref, isInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    fetchNextPage();
  }, [isInView, fetchNextPage]);

  const pokemons = useMemo(
    () => data.pages.flatMap((page) => page.results),
    [data]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">포켓몬 목록</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className="mb-2 flex items-center">
            <Link to={`/${pokemon.name}`} className="flex items-center">
              <img
                src={getPokemonImageUrl(pokemon.url)}
                alt={pokemon.name}
                className="w-10 h-10 mr-2"
              />
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div ref={ref} />
    </div>
  );
};

export default Pokemons;
