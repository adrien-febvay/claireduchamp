import type { i18n } from '@/utils/i18n';
import type { Button as Component } from '.';

declare module '.' {
  namespace Button {
    /** Language `<Button>` sub-component properties. */
    interface Props {
      /** Language code. */
      code: i18n.Language;
      /** Language name. */
      name: string;
    }
  }

  type Props = Component.Props;
}
