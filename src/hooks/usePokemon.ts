import pokemonQueries from '@/queries/pokemonQueries';
import { useSuspenseQuery } from '@tanstack/react-query';

export const usePokemon = (name: string) => {
  const { data: pokemon } = useSuspenseQuery(pokemonQueries.detail(name));
  return pokemon;
};
