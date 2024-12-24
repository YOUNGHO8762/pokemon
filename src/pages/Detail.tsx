import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const name = params.name as string;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const Detail = () => {
  const pokemon = useLoaderData<Pokemon>();
  const navigate = useNavigate();

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">오류</h1>
        <p>포켓몬 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
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
