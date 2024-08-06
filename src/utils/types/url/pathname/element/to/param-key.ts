// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace Element {
          namespace To {
            /** All param keys of `Element`. */
            type ParamKey<Element extends string> =
              Extract<Element, `:${string}`> extends `:${infer Key}` ? (string extends Key ? never : Key) : never;

            namespace ParamKey {
              /** Mandatory param keys of `Element`. */
              type Mandatory<Element extends string> = Exclude<ParamKey<Element>, `${string}?`>;

              /** Optional param keys of `Element`. */
              type Optional<Element extends string> =
                Extract<ParamKey<Element>, `${string}?`> extends `${infer Key}?`
                  ? string extends Key
                    ? never
                    : Key
                  : never;
            }
          }
        }
      }
    }
  }
}
