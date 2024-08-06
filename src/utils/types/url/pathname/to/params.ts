// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace To {
          /** Get the parameters of a `Pathname`. */
          type Params<Pathname extends string> = Element.To.Params<To.Element<Pathname>>;
        }
      }
    }
  }
}
