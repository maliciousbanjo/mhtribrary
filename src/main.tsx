import { FocusStyleManager } from '@blueprintjs/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './main.scss';
import { AboutPage } from './routes/about-page/about-page.tsx';
import { DamagePage } from './routes/damage-page/damage-page.tsx';
import { RootLayout } from './routes/root-layout';
import { ErrorPage } from './routes/error/index.ts';

FocusStyleManager.onlyShowFocusOnTabs();

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
