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
export function onEvent<Emitter extends _.Event.Custom.Emitter.Generic, Type extends string>(
  emitter: Emitter.Or.Ref<Emitter>,
  type: Type,
  listener: _.Event.Listener<Emitter, Extract<Type, string>>,
): Toggler;

export function onEvent<Emitter extends _.Event.Native.Emitter.Generic, Type extends string>(
  emitter: Emitter.Or.Ref<Emitter>,
  type: Type,
  listener: _.Event.Listener<Emitter, Extract<Type, string>>,
  options?: _.Event.Listener.Options,
): Toggler;

export function onEvent(
  emitter: Emitter.Or.Ref,
  type: string,
  listener: _.Event.Listener.Generic,
  options?: _.Event.Listener.Options,
): Toggler {
  const memo = React.useMemo(makeMemo, []);

  React.useEffect(updateListener);

  function isRefObject(emitter: Emitter.Or.Ref): emitter is Emitter.Ref {
    return emitter ? 'current' in emitter && !('addEventListener' in emitter) : false;
  }

  function makeMemo() {
    return { emitter: { current: null } as Emitter.Ref, type, listener, options, active: false };
  }

  function removeListener() {
    toggleListener(false);
  }

  function toggleListener(active = !memo.active): boolean {
    const emitter = memo.emitter.current;
    if (emitter) {
      const fn = active ? (emitter.addEventListener ?? emitter.on) : (emitter.removeEventListener ?? emitter.off);
      fn?.call(emitter, memo.type, memo.listener, memo.options);
      memo.active = true;
    }
    return memo.active;
  }

  function updateListener(): typeof removeListener {
    const resolvedEmitter = isRefObject(emitter) ? emitter : { current: emitter || null };
    const resolvedOptions = typeof options === 'object' ? options.capture : (options ?? false);
    const diff = resolvedEmitter.current !== memo.emitter.current || type !== memo.type || listener !== memo.listener;
    if (diff || resolvedOptions !== memo.options) {
      toggleListener(false);
      memo.emitter = resolvedEmitter;
      memo.type = type;
      memo.listener = listener;
      memo.options = resolvedOptions;
      toggleListener(true);
    }
    return removeListener;
  }

  return toggleListener;
}
