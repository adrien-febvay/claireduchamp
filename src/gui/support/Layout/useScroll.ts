import { Context } from './Context';

export function useScroll(): Context.Value {
  return React.useContext(Context);
}
