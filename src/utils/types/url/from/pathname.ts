// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace From {
        /** Get the pathname of a `Url`, if supported by protocol. */
        type Pathname<Pathname extends string> = `${Pathname.Protocol | ''}${Pathname}`;
      }
    }
  }
}
