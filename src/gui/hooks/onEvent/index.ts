import type { _ } from '@/utils/types';

/**
 * Appends an event listener on the specified element, keeps it updated and automatically dismiss it upon unmount.
 * @param el Element to append the event listener onto.
 * @param type Type of event to listen to.
 * @param listener Function invoked when the event is dispatched on the element.
 * @param options Options object, or `boolean` as a shortcut to set `{ capture }`.
 * @param options.capture Sets when the listener will be invoked depdending on the event's `eventPhase` attribute value. More information below.
 * @param options.passive When `true`, the listener will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
 * @param options.once When `true`, the listener will only be invoked once after which the event listener will be removed.
 * @param options.signal If an `AbortSignal` is passed, then the event listener will be removed when signal is aborted.
 * @returns A function which can toggle the listener on and off.
 *
 * @notes
 *
 * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
 *
 * About `options.capture` and the event's `eventPhase` attribute value:
 * - If `true`, the listener will not be invoked when `{ eventPhase: 'BUBBLING_PHASE' }`.
 * - If `false` or omitted, the listener will not be invoked when `{ eventPhase: 'CAPTURING_PHASE' }`.
 * - Either way, the listener will be invoked when `{ eventPhase: 'AT_TARGET' }`.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */

export function onEvent<Host extends AnyHost, Type extends _.Event.Type<Host>>(
  host: MaybeHostOrRef<Host>,
  type: Type,
  listener: _.Event.Listener<Host, Type>,
  options?: _.Event.Listener.Options.Argument,
): Toggler;

export function onEvent(
  host: MaybeHostOrRef,
  type: string,
  listener: _.Event.Listener.Generic,
  options?: _.Event.Listener.Options.Argument,
): Toggler;

export function onEvent(host: MaybeHostOrRef, ...params: Parameters<AnyHost['addEventListener']>): Toggler {
  const memo = React.useMemo(() => ({ host: null as MaybeHost, params, active: false }), []);

  React.useEffect(updateListener);

  function addListener(): void {
    if (memo.host) {
      memo.host.addEventListener(...memo.params);
      memo.active = true;
    }
  }

  function isRefObject(host: MaybeHostOrRef): host is HostRef {
    return host ? 'current' in host && !('addEventListener' in host) : false;
  }

  function removeListener(): void {
    if (memo.host) {
      memo.host.removeEventListener(...memo.params);
      memo.active = false;
    }
  }

  function toggleListener(active = !memo.active): boolean {
    if (active) {
      addListener();
    } else {
      removeListener();
    }
    return memo.active;
  }

  function updateListener(): typeof removeListener {
    removeListener();
    memo.host = isRefObject(host) ? host.current : host;
    memo.params = params;
    addListener();
    return removeListener;
  }

  return toggleListener;
}
