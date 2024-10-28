import type { Photo as Component } from '.';
import type { _ } from '@/utils/types';

declare module '.' {
  namespace Photo {
    type Props = Props.WithoutCopyright | Props.WithCopyright;

    namespace Props {
      interface Copyright {
        credit: string;
        href: string;
      }

      type WithoutCopyright = React.ImageAttributes & _.Object.Void<Copyright>;

      type WithCopyright = React.ImageAttributes & Copyright;
    }
  }

  type Props = Component.Props;
}
