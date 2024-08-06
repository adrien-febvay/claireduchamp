// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _ } from '@/utils/types';

declare module '.' {
  export interface TimeoutPromise {
    readonly aborted?: boolean;
    readonly timeout: NodeJS.Timeout;
    readonly throwOnAbort: boolean;

    resolve(this: void): void;
    reject(this: void, reason?: string): void;
  }

  namespace TimeoutPromise {
    type Argument = Delay | Params;

    type Delay = number;

    type Params = {
      delay: number;
      throwOnAbort?: boolean;
    };
  }

  type Argument = TimeoutPromise.Argument;

  type Delay = TimeoutPromise.Delay;

  type Params = TimeoutPromise.Params;
}
