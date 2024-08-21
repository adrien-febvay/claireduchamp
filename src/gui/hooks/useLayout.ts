import { Context } from '@/gui/support/Layout';

export function useLayout(): Context.Value {
  return React.useContext(Context);
}
