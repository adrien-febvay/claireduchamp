import '.';

declare module '.' {
  namespace _ {
    namespace Coalesce {
      /**
       * If a `[Type]` is `never`, resolves as `Fallback`, otherwise as `Type`.
       *
       * The provided `[Type]` has to be enclosed in brackets,
       * because if any generic type is provided `never`,
       * it will always resolve as `never` no matter what.
       *
       * If `Fallback` could possibly be `never`, use:
       * ```
       * _.Coalesce.Never<[InputType], [OutputType]>[0]
       * ```
       */
      type Never<Type extends [unknown], Fallback> = If.Never<Type, Fallback, Type[0]>;

      /** Replaces `void` from provided `Type` with `Fallback`. */
      type Void<Type, Fallback = undefined> = If.Void<Type, Fallback> | Exclude<Type, void>;
    }
  }
}
