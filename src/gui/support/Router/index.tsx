import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

const browserRouter = createBrowserRouter(routes);

export const Support_Router: React.FC = () => <RouterProvider router={browserRouter} />;

export const Router = Support_Router;
