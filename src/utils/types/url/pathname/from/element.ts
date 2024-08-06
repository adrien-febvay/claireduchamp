// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace Pathname {
        namespace From {
          type Elements<Elements extends readonly [...string[]], Pathname extends string = ''> = Elements extends [
            infer Element,
            ...infer Rest,
          ]
            ? From.Elements<Extract<Rest, readonly [...string[]]>, `${Pathname}/${Extract<Element, string>}`>
            : Pathname extends `/${infer Pathname}`
              ? Pathname
              : Pathname;
        }
      }
    }
  }
}
