import type { Redirection } from '@/be/middlewares/Redirection';
import type { _ } from '@/utils/types';

import updates from './updates.json';

type Updates = typeof updates;
type Origin = keyof Updates;

type SafeUpdates = Updates &
  _.If.Not.Never<[{ [Key in Origin]: Updates[Key] extends string ? string : never }[Origin]], _.Dict<string>>;
const safeUpdates = updates as SafeUpdates;

export function UpdatesRedirection(): Redirection.Handler {
  return ({ pathname }) => pathname in safeUpdates && { pathname: safeUpdates[pathname] };
}
