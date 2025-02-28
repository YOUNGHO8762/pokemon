import { useRouteError } from 'react-router';
import { extractErrorMessage } from '@/lib/utils';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <h2 className="mt-2 text-lg text-gray-700">
          {extractErrorMessage(error)}
        </h2>
      </div>
    </div>
  );
};

export default Error;
