import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { DamagePage } from './routes/damage/damage-page.tsx';
import { RootLayout } from './routes/root-layout';
import { AboutPage } from './routes/about/about-page.tsx';

const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      {
        // TODO: Create a home page?
        path: '/',
        element: <DamagePage />
      },
      {
        path: 'blade-damage',
        element: <DamagePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
