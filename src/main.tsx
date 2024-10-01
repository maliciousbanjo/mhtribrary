import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DamagePage } from './routes/damage/damagePage.tsx';
import { RootPage } from './routes/root/rootPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        // path: 'damageBlade/',
        path: '/',
        element: <DamagePage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
