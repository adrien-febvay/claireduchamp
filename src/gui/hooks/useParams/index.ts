import { _ } from '@/utils/types';
import { Context } from '@/gui/support/Router/Context';

export function useParams<Params extends object = _.Dict>(): Filter<Params>;
export function useParams(): object {
  return React.useContext(Context).params;
}

type Filter<Params extends object> = {
  [Key in Extract<keyof Params, string>]: Params[Key] extends string | undefined ? Params[Key] : never;
};
