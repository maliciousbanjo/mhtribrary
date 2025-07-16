import { FocusStyleManager } from '@blueprintjs/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './main.scss';
import { AboutPage } from './routes/about/about-page.tsx';
import { DamagePage } from './routes/damage/damage-page.tsx';
import { RootLayout } from './routes/root-layout';

FocusStyleManager.onlyShowFocusOnTabs();

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
