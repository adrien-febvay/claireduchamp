import type { z } from 'zod';
import type { CacheManager as Me } from '.';

declare module '.' {
  interface CacheManager {
    on(type: 'set', listener: CacheManager.Listeners.Set): this;
    off(type: 'set', listener: CacheManager.Listeners.Set): this;
  }

  namespace CacheManager {
    type Data = z.infer<typeof Me.schema>;

    namespace Listeners {
      type Set = (key: string) => void;
    }

    interface Options {
      reset?: boolean;
    }
  }

  type Data = Me.Data;

  type Options = Me.Options;
}
