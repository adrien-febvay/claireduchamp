import type { Nav } from '@/gui/molecules/Nav';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Scroll as _Scroll } from './Scroll';

declare module '.' {
  namespace Context {
    type Value = {
      nav?: Nav.Ref | null;
      scroll: Scroll;
    };

    type Scroll = InstanceType<typeof _Scroll>;

    namespace Scroll {
      type EventMap = _Scroll.EventMap;

      type Target = _Scroll.Target;
    }
  }

  type Value = Context.Value;
}
