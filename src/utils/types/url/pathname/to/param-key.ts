// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace To {
          /** All param keys of `Pathname`. */
          type ParamKey<Pathname extends string> = Element.To.ParamKey<Element<Pathname>>;

          namespace ParamKey {
            /** Mandatory param keys of `Pathname`. */
            type Mandatory<Pathname extends string> = Element.To.ParamKey.Mandatory<Element<Pathname>>;

            /** Optional param keys of `Pathname`. */
            type Optional<Pathname extends string> = Element.To.ParamKey.Optional<Element<Pathname>>;
          }
        }
      }
    }
  }
}
