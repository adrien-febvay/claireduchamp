import { Head } from '@/gui/support/Head';

export const useDevice = () => React.useContext(Head.Context).device;
