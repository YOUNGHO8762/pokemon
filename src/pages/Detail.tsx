import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router';
import { fetchPokemon } from '@/api/pokemonApi';

const pokemonQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: () => fetchPokemon(name),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const name = params.name;
    if (!name) {
      throw new Error('No Pokémon name provided');
    }
    await queryClient.ensureQueryData(pokemonQuery(name));
    return { name };
  };

const Detail = () => {
  const { name } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data: pokemon } = useSuspenseQuery(pokemonQuery(name));
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="w-40 h-40 mb-4"
      />
      <p>키: {pokemon.height}</p>
      <p>몸무게: {pokemon.weight}</p>
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
