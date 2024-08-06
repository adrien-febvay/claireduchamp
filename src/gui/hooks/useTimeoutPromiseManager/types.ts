import type { TimeoutPromiseManager } from '@/gui/utils/timeout/Promise/Manager';

declare module '.' {
  namespace useTimeoutPromiseManager {
    type Argument = Delay | Params;

    type Delay = TimeoutPromiseManager.Delay;

    type Params = TimeoutPromiseManager.Params & {
      throwOnUnmount?: boolean;
    };
  }

  type Argument = useTimeoutPromiseManager.Argument;

  type Delay = useTimeoutPromiseManager.Delay;

  type Params = useTimeoutPromiseManager.Params;
}
