import { createBrowserRouter } from 'react-router';
import Error from '@/pages/Error';
import Detail from '@/pages/Detail';
import Pokemons from '@/pages/Pokemons';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Pokemons />,
      },
      {
        path: ':name',
        element: <Detail />,
      },
    ],
  },
]);

export default router;
