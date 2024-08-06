// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '@/utils/types';

declare module '.' {
  namespace useDeviceSize {
    type Initializer<Sizes> = () => Sizes;

    type Sizes = readonly [readonly [string], ...(readonly [string, number])[]];

    namespace Sizes {
      type Default = typeof defaultSizes;
    }
  }

  type Initializer<Sizes> = useDeviceSize.Initializer<Sizes>;

  type Sizes = useDeviceSize.Sizes;

  namespace Sizes {
    type Default = useDeviceSize.Sizes.Default;
  }
}
