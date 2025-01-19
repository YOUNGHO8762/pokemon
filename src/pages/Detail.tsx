import {
  LoaderFunctionArgs,
  NavigationType,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router';
import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { pokemonQuery } from '@/queries/pokemonQueries';
import { useNavigationCallback } from '@/hooks/useNavigationCallback';

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
  const { state: scrollY } = useLocation();
  useNavigationCallback(
    () => sessionStorage.setItem('scrollY', scrollY),
    NavigationType.Pop,
  );
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">{pokemon.name}</h1>
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="mb-4 size-40"
      />
      <p>키: {pokemon.height}</p>
      <p>몸무게: {pokemon.weight}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Detail;
