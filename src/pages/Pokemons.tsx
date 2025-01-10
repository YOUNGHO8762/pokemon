import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { fetchPokemons } from '@/api/pokemonApi';

const pokemonsQuery = () => ({
  queryKey: ['pokemons'],
  queryFn: fetchPokemons,
});

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(pokemonsQuery());
};

const getPokemonImageUrl = (url: string): string => {
  const parts = url.split('/');
  const key = parts[parts.length - 2];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${key}.png`;
};

const Pokemons = () => {
  const { data: pokemons } = useSuspenseQuery(pokemonsQuery());

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
    </div>
  );
};

export default Pokemons;
