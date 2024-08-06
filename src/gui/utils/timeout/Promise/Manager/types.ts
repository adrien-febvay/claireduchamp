import type { TimeoutPromise } from '@/gui/utils/timeout/Promise';

declare module '.' {
  namespace TimeoutPromiseManager {
    type Argument = TimeoutPromise.Argument;

    type Delay = TimeoutPromise.Delay;

    type Params = TimeoutPromise.Params;
  }

  type Argument = TimeoutPromiseManager.Argument;

  type Delay = TimeoutPromiseManager.Delay;

  type Params = TimeoutPromiseManager.Params;
}
