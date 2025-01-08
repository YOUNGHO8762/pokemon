import { useRouteError } from 'react-router';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">에러 발생</h1>
        <h2 className="text-lg text-gray-700 mt-2">{String(error)}</h2>
      </div>
    </div>
  );
};

export default Error;
