import { createBrowserRouter } from 'react-router';
import queryClient from '@/api/queryClient';
import Error from '@/pages/Error';
import Detail, { loader as detailLoader } from '@/pages/Detail';
import Pokemons, { loader as listLoader } from '@/pages/Pokemons';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Pokemons />,
        loader: () => listLoader(queryClient),
      },
      {
        path: '/:name',
        element: <Detail />,
        loader: () => detailLoader(queryClient),
      },
    ],
  },
]);

export default router;
