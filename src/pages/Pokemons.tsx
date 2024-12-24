import { Link, useLoaderData } from 'react-router';

interface Pokemon {
  name: string;
  url: string;
}

export const loader = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const { results } = await response.json();
    return results;
  } catch (error) {
    alert(error);
    return [];
  }
};

const Pokemons = () => {
  const pokemons = useLoaderData<Pokemon[]>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">포켓몬 목록</h1>
      <ul>
        {pokemons.map((pokemon) => {
          const pokemonIndex = pokemon.url.split('/').slice(-2, -1)[0];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
          return (
            <li key={pokemon.name} className="mb-2 flex items-center">
              <Link to={`/${pokemon.name}`} className="flex items-center">
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="w-10 h-10 mr-2"
                />
                {pokemon.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pokemons;
