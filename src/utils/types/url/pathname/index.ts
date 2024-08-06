// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        /** Protocols supported by pathname. */
        type Protocol = 'http:/' | 'https:/';
      }
    }
  }
}
