import { onEvent } from '@/gui/hooks/onEvent';
import { DataHandler } from './Data';

export function useSwipe(host: MaybeHostOrRef, handler: Handler, deps: unknown[] = []): Toggler {
  const memo = React.useMemo(() => new DataHandler(), []);

  onEvent(host, 'touchstart', touchStart, deps);
  onEvent(host, 'touchmove', touchMove, deps);
  onEvent(host, 'touchend', touchEnd, deps);

  function touchStart(this: Emitter, event: TouchEvent): void {
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
