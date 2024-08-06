// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace Element {
          namespace To {
            /** Get the parameters of an `Element`. */
            type Params<Element extends string> = string extends Element
              ? Params.Any
              : Url.ParamKey.To.Params<To.ParamKey.Mandatory<Element>, To.ParamKey.Optional<Element>>;
          }
        }
      }
    }
  }
}
