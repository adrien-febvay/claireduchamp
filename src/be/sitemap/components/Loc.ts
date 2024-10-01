import { LocationContext } from '@/be/sitemap/support/LocationContext';

interface Props {
  children: string;
}

export function Loc({ children }: Props) {
  const { baseurl } = React.useContext(LocationContext);
  return React.createElement('loc', void 0, `${baseurl}${children}`);
}
