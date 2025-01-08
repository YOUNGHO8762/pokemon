import { QueryClient } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router';

interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data: PokemonsResponse = await response.json();
  return data.results;
};

const pokemonsQuery = () => ({
  queryKey: ['pokemons'],
  queryFn: fetchPokemons,
});

export const loader = async (queryClient: QueryClient) => {
  const query = pokemonsQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const getPokemonImageUrl = (url: string): string => {
  const parts = url.split('/');
  const key = parts[parts.length - 2];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${key}.png`;
};

const Pokemons = () => {
  const pokemons = useLoaderData<Pokemon[]>();

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
