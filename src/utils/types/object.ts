// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Object {
      /** Any object key. */
      type Key = string | number | symbol;

      /**
       * Assigns all properties of `Source` on `Target` types.
       *
       * Warning: removes function signatures.
       */
      type Assign<Target, Source> =
        | Resolve<Pick<Source, keyof Source> & Omit<Target, keyof Source>>
        | Exclude<Target | Source, object | _.Executable.Any>;

      namespace Assign {
        type Multi<Target, Sources extends [...unknown[]]> = Sources extends [infer Source, ...infer SourcesLeft]
          ? Multi<Assign<Target, Source>, SourcesLeft>
          : Target;
      }

      /**
       * Sets all properties of `Type` to optional and `undefined`.
       *
       * Warning: removes function signatures.
       */
      type Void<Type> =
        | Resolve<{ [Key in keyof Extract<Type, object | _.Executable.Any>]?: undefined }>
        | Exclude<Type, object | _.Executable.Any>;

      namespace Void {
        /**
         * Sets properties of `Target` type to optional and `undefined`
         * except for specified `Key`.
         *
         * Warning: removes function signatures.
         */
        type Except<Type, Key extends Object.Key> = Resolve<
          Void<globalThis.Pick<Type, Extract<Key, keyof Type>>> & globalThis.Omit<Type, Extract<Key, keyof Type>>
        >;

        /**
         * Sets all properties of `Target` type to optional and `undefined`
         * ands assigns `Source` type on it.
         *
         * Warning: removes function signatures.
         */
        type Assign<Target, Source> =
          | Resolve<globalThis.Pick<Source, keyof Source> & Void<globalThis.Omit<Target, keyof Source>>>
          | Exclude<Target | Source, object | _.Executable.Any>;

        /**
         * Sets all properties of `Target` type to optional and `undefined`
         * ands omits specified `Key`.
         *
         * Warning: removes function signatures.
         */
        type Omit<Type, Key extends Object.Key> = Void<globalThis.Omit<Type, Extract<Key, keyof Type>>>;

        /**
         * Sets properties of `Target` type specified by `Key` to optional and `undefined`
         * ands leaves others as they are.
         *
         * Warning: removes function signatures.
         */
        type Only<Type, Key extends Object.Key> = Resolve<
          Void<globalThis.Pick<Type, Extract<Key, keyof Type>>> & globalThis.Omit<Type, Extract<Key, keyof Type>>
        >;

        /**
         * Sets properties of `Target` type to optional and `undefined`
         * ands picks specified `Key`.
         *
         * Warning: removes function signatures.
         */
        type Pick<Type, Key extends Object.Key> = Void<globalThis.Pick<Type, Extract<Key, keyof Type>>>;
      }
    }
  }
}
