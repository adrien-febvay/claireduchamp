import type { Nav } from '@/gui/molecules/Nav';
import type { Layout as Component } from '.';

declare module '.' {
  namespace Layout {
    type Props = {
      /** Top of the content to scroll to. */
      goto?: string;
      /** Screen to display. */
      Screen: React.FC & {
        /** Show/play intro? */
        intro?: boolean;

        /** Footer stylesheet. */
        footerStyles?: Nav.Props['styles'];

        /** Navigation bar stylesheet. */
        navStyles?: Nav.Props['styles'];
      };
    };
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
