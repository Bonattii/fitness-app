import { createBrowserRouter } from 'react-router-dom';

import Default from './layouts/Default';

import { Home, Workout } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/workout',
        element: <Workout />
      }
    ]
  }
]);
