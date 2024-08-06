// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace To {
          /** `Pathname` element. */
          type Element<Url extends string> = To.Elements<Url.To.Pathname<Url>>[number];
        }
      }
    }
  }
}
