import type { _ } from '@/utils/types';
import type { onEvent } from '@/gui/hooks/onEvent';
import type { useSwipe } from '.';

declare module '.' {
  namespace useSwipe {
    namespace Event {
      type Data = {
        axis: 'x' | 'y' | null;
        deltaX: number;
        deltaY: number;
        deltaT: number;
        pageX: number;
        pageY: number;
        speedX: number;
        speedY: number;
        startX: number;
        startY: number;
        startT: number;
      };

      type Type = 'touchstart' | 'touchmove' | 'touchend';
    }

    type Handler = (event: TouchEvent, data: Event.Data) => void;

    type Host = _.Event.Host.Using<Event.Type>;

    type Toggler = onEvent.Toggler;
  }

  type Handler = useSwipe.Handler;

  type Host = useSwipe.Host;

  type MaybeHostOrRef = onEvent.MaybeHostOrRef<Host>;

  type Toggler = useSwipe.Toggler;
}

declare module './Data' {
  type Data = useSwipe.Event.Data;
}
