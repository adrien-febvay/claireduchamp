// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace To {
        /** All param keys of `Url`. */
        type ParamKey<Url extends string> = Pathname.To.ParamKey<To.Pathname<Url>>;

        namespace ParamKey {
          /** Mandatory param keys of `Url`. */
          type Mandatory<Url extends string> = Pathname.To.ParamKey.Mandatory<To.Pathname<Url>>;

          /** Optional param keys of `Url`. */
          type Optional<Url extends string> = Pathname.To.ParamKey.Optional<To.Pathname<Url>>;
        }
      }
    }
  }
}
