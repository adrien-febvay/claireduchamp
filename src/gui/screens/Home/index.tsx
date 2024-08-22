import { Services } from '@/gui/screens/Services';
import { route } from '@/gui/screens/route';

const namespace = 'Screens/Home';

export const Screen_Home: React.FC = () => <Services />;

export const Home = Object.assign(Screen_Home, {
  intro: true,
  route: route.fromLocales(namespace),
} as const);
