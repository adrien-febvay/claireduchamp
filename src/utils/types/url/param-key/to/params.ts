// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace ParamKey {
        namespace To {
          /** Get the Params of a `Url`, if supported by protocol. */
          type Params<Mandatory extends string, Optional extends string> = Resolve<
            { [Key in Mandatory]: string } & {
              [Key in Optional]?: string;
            }
          >;
        }
      }
    }
  }
}
