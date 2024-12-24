import Detail, { loader as detailLoader } from '@/pages/Detail';
import Pokemons, { loader as listLoader } from '@/pages/Pokemons';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Pokemons />,
        loader: listLoader,
      },
      {
        path: '/:name',
        element: <Detail />,
        loader: detailLoader,
      },
    ],
  },
]);

export default router;
