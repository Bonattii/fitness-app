import { createBrowserRouter } from 'react-router-dom';

import Default from './layouts/Default';

import Home from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);
