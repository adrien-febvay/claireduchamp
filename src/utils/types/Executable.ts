/* eslint-disable @typescript-eslint/no-explicit-any */
import '.';

declare module '.' {
  namespace _ {
    type Constructor<Args extends readonly unknown[] = readonly unknown[], Instance extends object = object> = new (
      ...args: Args
    ) => Instance;

    namespace Constructor {
      type Any = Constructor<any, any>;
    }

    type Executable<Args extends readonly unknown[] = readonly unknown[], Instance extends object = object> =
      | _.Function<Args, Instance>
      | Constructor<Args, Instance>;

    namespace Executable {
      type Any = Function.Any | Constructor.Any;
    }

    type Function<Args extends readonly unknown[] = readonly unknown[], ReturnType = unknown> = (
      ...args: Args
    ) => ReturnType;

    namespace Function {
      type Any = _.Function<any, any>;
    }

    type ResultType<Executable> =
      | ReturnType<Extract<Executable, Function.Any>>
      | InstanceType<Extract<Executable, Constructor.Any>>;
  }
}
