// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace To {
          /** `Pathname` elements. */
          type Elements<Url extends string> =
            Url.To.Pathname<Url> extends `${infer Element}/${infer Subpath}`
              ? [Element, ...Elements<Subpath>]
              : [Url.To.Pathname<Url>];
        }
      }
    }
  }
}
