import type { z } from 'zod';
import type { CacheManager as Me } from '.';

declare module '.' {
  namespace CacheManager {
    type Data = z.infer<typeof Me.schema>;

    interface Options {
      reset?: boolean;
    }
  }

  type Data = Me.Data;

  type Options = Me.Options;
}
