import type { _ } from '.';

declare module '.' {
  namespace _ {
    /** `Value` that can be falsy. */
    type Falsy<Value = never> = Id<Optional<Value | 0 | ''>>;
  }
}

/**
 * Is a value truthy?
 * @typeparam Truthy Truthy types of the input value.
 * @param val Value to check.
 * @returns A boolean accordingly.
 */
export function isTruthy<Truthy>(val: Truthy | _.Falsy): val is Truthy {
  return Boolean(val);
}
