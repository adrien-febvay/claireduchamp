import { Services } from '@/gui/screens/Services';

export const Screen_Home: React.FC = () => <Services />;

export const Home = Object.assign(Screen_Home, {
  intro: true,
  route: { mul: { pathname: '/' } },
} as const);
