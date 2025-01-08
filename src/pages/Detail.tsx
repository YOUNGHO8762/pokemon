import { QueryClient, useQuery } from '@tanstack/react-query';
import { LoaderFunctionArgs, useNavigate, useParams } from 'react-router';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data: Pokemon = await response.json();
  return data;
};

const pokemonQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: () => fetchPokemon(name),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const name = params.name as string;
    const query = pokemonQuery(name);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const Detail = () => {
  const params = useParams();
  const { data: pokemon } = useQuery(pokemonQuery(params.name ?? ''));
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{pokemon?.name}</h1>
      <img
        src={pokemon?.sprites?.front_default}
        alt={pokemon?.name}
        className="w-40 h-40 mb-4"
      />
      <p>키: {pokemon?.height}</p>
      <p>몸무게: {pokemon?.weight}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Detail;
