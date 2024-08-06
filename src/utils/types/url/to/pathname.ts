// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '@/utils/types' {
  namespace _ {
    namespace Url {
      namespace To {
        /** Get the pathname of a `Url`, if supported by protocol. */
        type Pathname<Url extends string> = Url extends `${Pathname.Protocol}${infer Pathname}`
          ? Pathname
          : Url extends `${infer MaybeProtocol}:${string}`
            ? If.Letters<MaybeProtocol, never, Url>
            : Url;
      }
    }
  }
}
