import { useRouteError } from 'react-router';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">에러 발생</h1>
        <h2 className="mt-2 text-lg text-gray-700">{String(error)}</h2>
      </div>
    </div>
  );
};

export default Error;
