import type { Nav } from '@/gui/molecules/Nav';
import type { Context as _Context } from './Context';
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

    namespace Context {
      type Value = _Context.Value;

      type Scroll = _Context.Scroll;

      namespace Scroll {
        type EventMap = _Context.Scroll.EventMap;

        type Target = _Context.Scroll.Target;
      }
    }
  }

  /** Internal component properties. */
  type Props = Component.Props;
}
