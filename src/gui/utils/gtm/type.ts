// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '.' {
  namespace gtm {
    type Data = { event: string };
  }

  type Data = gtm.Data;
}
