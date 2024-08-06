// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace To {
        /** Get the parameters of a `Url`, if supported by protocol. */
        type Params<Url extends string> = If.Not.Never<
          [To.Pathname<Url>],
          Pathname.To.Params<To.Pathname<Url>>,
          object
        >;
      }
    }
  }
}
