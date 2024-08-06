import { _ } from '@/utils/types';

import { TimeoutPromiseManager } from '@/gui/utils/timeout/Promise/Manager';

export function useTimeoutPromiseManager(params?: Argument): TimeoutPromiseManager {
  const memo = React.useMemo(
    () => ({
      throwOnUnmount: _.object(params)?.throwOnUnmount,
      timeoutPromiseManager: new TimeoutPromiseManager(params),
    }),
    [],
  );

  React.useEffect(() => () => void memo.timeoutPromiseManager.abort('Unmount', memo.throwOnUnmount), []);

  return memo.timeoutPromiseManager;
}
