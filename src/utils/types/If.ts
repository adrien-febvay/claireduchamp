/* eslint-disable @typescript-eslint/no-invalid-void-type */
import '.';

declare module '.' {
  namespace _ {
    namespace If {
      /** If `Left` type extends `Right` type and vice-versa, returns `Then`, otherwise `Else`. */
      type Equals<Left, Right, Then, Else = never> = Left extends Right ? (Right extends Left ? Then : Else) : Else;

      /**
       * If provided `[Type]` is `never`, resolves as `Then`, otherwise as `Else`.
       *
       * The provided `[Type]` has to be enclosed in brackets,
       * because if any generic type is provided `never`,
       * it will always resolve as `never` no matter what.
       *
       * If `Then` have to be provided with `never`, use `_.If.Not.Never` instead.
       *
       * If `Then` or `Else` could possibly be `never`, use brackets on them too:
       * ```
       * _.If.Never<[Type], [Then], [Else]>[0]
       * ```
       */
      type Never<Type extends [unknown], Then, Else = never> = Type[0] extends never ? Then : Else;

      /** If provided `Type` is `void`, resolves as `Then`, otherwise as `Else`. */
      type Void<Type, Then, Else = never> = Type extends void ? (Type extends undefined ? Else : Then) : Else;

      namespace Not {
        /** If `Left` type doesn't extend `Right` type or vice-versa, returns `Then`, otherwise `Else`. */
        type Equals<Left, Right, Then, Else = never> = Left extends Right ? Else : Right extends Left ? Else : Then;

        /**
         * If provided `[Type]` is not `never`, resolves as `Then`, otherwise as `Else`.
         *
         * The provided `[Type]` has to be enclosed in brackets,
         * because if any generic type is provided `never`,
         * it will always resolve as `never` no matter what.
         *
         * If `Then` or `Else` could possibly be `never`, use brackets on them too:
         * ```
         * _.If.Not.Never<[Type], [Then], [Else]>[0]
         * ```
         */
        type Never<Type extends [unknown], Then, Else = never> = Type[0] extends never ? Else : Then;

        /** If provided `Type` is not `void`, resolves as `Then`, otherwise as `Else`. */
        type Void<Type, Then, Else = never> = Type extends void ? (Type extends undefined ? Then : Else) : Then;
      }
    }
  }
}
