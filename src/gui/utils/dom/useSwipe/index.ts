import { onEvent } from '@/gui/hooks/onEvent';
import { DataHandler } from './Data';

export function useSwipe(host: MaybeHostOrRef, handler: Handler): Toggler {
  const memo = React.useMemo(() => new DataHandler(), []);

  onEvent(host, 'touchstart', touchStart, []);
  onEvent(host, 'touchmove', touchMove, []);
  onEvent(host, 'touchend', touchEnd, []);

  function touchStart(this: Host, event: TouchEvent): void {
    event.preventDefault();
    const data = memo.restart(event.targetTouches[0]);
    if (data) {
      handler(event, data);
    }
  }

  function touchMove(event: TouchEvent): void {
    event.preventDefault();
    const data = memo.update(event.targetTouches[0]);
    if (data) {
      handler(event, data);
    }
  }

  function touchEnd(event: TouchEvent): void {
    event.preventDefault();
    const data = memo.end();
    if (data) {
      handler(event, data);
    }
  }

  function toggle(active?: boolean): boolean {
    return memo.toggle(active);
  }

  return toggle;
}
