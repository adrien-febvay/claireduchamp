import { Head } from '@/gui/support/Head';

export const useLocation = (): Head.Context.Location => React.useContext(Head.Context)?.location ?? location;
