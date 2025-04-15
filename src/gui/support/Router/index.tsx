import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookieConsent } from '@/gui/molecules/CookieConsent';
import { routes } from './routes';

const browserRouter = createBrowserRouter(routes);

export const Support_Router: React.FC = () => (
  <CookieConsent.Provider>
    <RouterProvider router={browserRouter} />
  </CookieConsent.Provider>
);

export const Router = Support_Router;
