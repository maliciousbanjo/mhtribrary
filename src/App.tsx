import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DamagePage } from './routes/damage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DamagePage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
