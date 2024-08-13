/* eslint @typescript-eslint/no-explicit-any: 0 */
import type { _ } from '.';

declare module '.' {
  namespace _ {
    /** Record of `Items` with string index. */
    type Dict<Item = unknown> = { [Key in string]?: Item };

    /** Resolves a `Type`. */
    type Id<Type> = Type;

    /** Iterable of `Type`. */
    type Iterable<Type = unknown> = globalThis.Iterable<Type>;

    namespace Iterable {
      /** `Type`or iterable of `Type`. */
      type Maybe<Type = unknown> = Type | Iterable<Type>;
    }

    /** `Value` that can be nullish. */
    type Nullish<Value = never> = Value | null | undefined;

    /** `Value` that can be false or nullish. */
    type Optional<Value> = Value | false | Id<Nullish>;

    /** Object with any type of index and values. */
    type Object = { [Key in string | number | symbol]?: unknown };

    /** Sets properties with specified `Keys` to be optional. */
    type OptionalKeys<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;

    namespace Promise {
      /** An object like a promise to a `Value`. */
      type Like<Value = unknown> = PromiseLike<Value>;

      namespace Like {
        /** An object like a promise to a `Value` or the `Value` itself. */
        type Or<Value = unknown> = Value | Like<Value>;
      }
    }

    /** Sets properties with specified `Keys` to be required. */
    type RequireKeys<T, Keys extends keyof T> = Omit<T, Keys> & Required<Pick<T, Keys>>;

    /** Forces TypeScript to resolve the type. */
    type Resolve<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

    /** Size of an element. */
    type Size = {
      /** Element width. */
      width: number;

      /** Element height. */
      height: number;
    };

    /** CSS style declaration or element which has one. */
    type Stylable = Style | Element;

    /** CSS style declaration. */
    type Style = CSSStyleDeclaration;

    /** Value of `Type[Key]`. */
    type Value<Type, Key> = Type[Key & keyof Type];

    /** All values of a `Type`. */
    type Values<Type> = Type[keyof Type];
  }
}

/**
 * Is a value iterable?
 * @param val Value to check.
 * @returns A boolean accordingly.
 */
export function isIterable<Value>(val: Value | Iterable<Value>): val is Iterable<Value> {
  return val != null ? typeof val[Symbol.iterator as keyof object] === 'function' : false;
}

/**
 * Returns the provided value if it is an iterable, otherwise returns it wrapped in an array.
 * @param val Value to return.
 * @returns An iterable accordingly.
 */
export function forceIterable<Value>(val: Value | Iterable<Value>): Iterable<Value> {
  return isIterable(val) ? val : [val];
}

/**
 * Is a value an object?
 * @param val Value to check.
 * @returns A boolean accordingly.
 */
export function isObject(val: unknown): val is _.Object {
  return val ? typeof val === 'object' : false;
}

/**
 * Can a value be read like an object (non-nullish)?
 * @param val Value to check.
 * @returns A boolean accordingly.
 */
export function isLikeReadableObject(val: unknown): val is _.Object {
  return val != null;
}

/**
 * Can a value be written like an object (object or function)?
 * @param val Value to check.
 * @returns A boolean accordingly.
 */
export function isLikeWritableObject(val: unknown): val is _.Object {
  return val ? typeof val === 'object' || typeof val === 'function' : false;
}

/**
 * Return the provided value if it is an object.
 * @param val Value to check and eventually return.
 * @returns The provided value or `null`.
 */
export function object<Type>(
  val: Type,
): _.Coalesce.Never<[Exclude<Extract<Type, object>, _.Executable.Any>], _.Object> | null;

export function object<Type>(val: Type): object | null {
  return val && typeof val === 'object' ? val : null;
}
