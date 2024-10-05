import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DamagePage } from './routes/damage/damage-page.tsx';
import { NavigationBar } from './routes/navigation/navigation-bar.tsx';
import { AboutPage } from './routes/about/about-page.tsx';

const router = createBrowserRouter([
  {
    element: <NavigationBar />,
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
