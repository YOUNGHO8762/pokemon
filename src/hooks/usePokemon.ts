import pokemonQueries from '@/queries/pokemonQueries';
import { useQuery } from '@tanstack/react-query';

export const usePokemon = (name: string) => {
  const { data: pokemon } = useQuery(pokemonQueries.detail(name));
  return pokemon;
};
