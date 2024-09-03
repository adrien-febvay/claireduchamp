import type { _ } from '@/utils/types';

const optionKeys = ['capture', 'passive', 'once', 'signal', 'wantsUntrusted'] as const;

const defaultOptions = {
  capture: false,
  passive: false,
  once: false,
  signal: void 0 as AbortSignal | undefined,
  wantsUntrusted: void 0 as boolean | undefined,
};

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
  listener: _.Event.Listener<Emitter, Type>,
  options: Pick<_.Event.Listener.Options, 'once'>,
  deps?: unknown[],
): Toggler;

export function onEvent<Emitter extends _.Event.Native.Emitter.Generic, Type extends string>(
  emitter: Emitter.Or.Ref<Emitter>,
  type: Type,
  listener: _.Event.Listener<Emitter, Type>,
  options: _.Event.Listener.Options | boolean,
  deps?: unknown[],
): Toggler;

export function onEvent<Emitter extends _.Event.Emitter.Generic, Type extends string>(
  emitter: Emitter.Or.Ref<Emitter>,
  type: Type,
  listener: _.Event.Listener<Emitter, Type>,
  deps?: unknown[],
): Toggler;

export function onEvent(
  emitter: Emitter.Or.Ref,
  type: string,
  listener: _.Event.Listener.Generic,
  arg3?: _.Event.Listener.Options | boolean | unknown[],
  arg4?: unknown[],
): Toggler {
  const memo = React.useMemo(makeMemo, []);
  const options = arg3 instanceof Array ? void 0 : arg3;
  const deps = arg4 ?? (arg3 instanceof Array ? arg3 : void 0);

  React.useEffect(updateListener);
  React.useEffect(discard, []);

  function depChange() {
    if (!(deps instanceof Array && memo.deps instanceof Array && deps.length === memo.deps.length)) {
      return true;
    } else {
      for (let index = deps.length - 1; index >= 0; index -= 1) {
        if (deps[index] !== memo.deps[index]) {
          return true;
        }
      }
      return false;
    }
  }

  function discard() {
    return removeListener;
  }

  function isRefObject(emitter: Emitter.Or.Ref): emitter is Emitter.Ref {
    return emitter ? 'current' in emitter && !('addEventListener' in emitter) : false;
  }

  function makeMemo() {
    const emitter: Emitter.Ref = { current: null };
    const options = {} as _.Event.Listener.Options;
    const types = [] as ReturnType<typeof resolveTypes>;
    return { emitter, types, listener, options, active: false, deps: void 0 as unknown[] | undefined };
  }

  function onceListener(...args: unknown[]) {
    removeListener();
    if (memo.emitter.current) {
      memo.listener.call(memo.emitter.current, ...args);
    }
  }

  function removeListener() {
    toggleListener(false);
  }

  function resolveOptions() {
    const inputOptions = typeof options === 'object' ? options : { capture: options ?? false };
    const resolvedOptions = {} as _.Event.Listener.Options;
    let change = false;
    for (const name of optionKeys) {
      const value = inputOptions[name] ?? defaultOptions[name];
      if (value !== resolvedOptions[name]) {
        // @ts-expect-error 2322 TS cannot match `resolvedOptions` and `options` properties based on `name`.
        resolvedOptions[name] = value;
        change = true;
      }
    }
    return change ? resolvedOptions : null;
  }

  function resolveTypes(): string[] & { str?: string } {
    const resolvedtypes = type
      .split(',')
      .map((type) => type.trim())
      .filter((type) => type)
      .sort();
    return Object.assign(resolvedtypes, { str: resolvedtypes.join(',') });
  }

  function toggleListener(active = !memo.active) {
    const emitter = memo.emitter.current;
    if (emitter) {
      // Allow unbound method since we use it properly on the next call anyway.
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const fn = active ? (emitter.addEventListener ?? emitter.on) : (emitter.removeEventListener ?? emitter.off);
      const listener = !emitter.addEventListener && memo.options.once ? onceListener : memo.listener;
      for (const type of memo.types) {
        fn?.call(emitter, type, listener, memo.options);
      }
      memo.active = active;
    }
    return memo.active;
  }

  function updateListener() {
    const update = depChange();
    const resolvedEmitter = isRefObject(emitter) ? emitter : { current: emitter || null };
    const emitterChange = resolvedEmitter.current !== memo.emitter.current;
    if (update || emitterChange) {
      const resolvedOptions = resolveOptions();
      const resolvedtypes = resolveTypes();
      if (emitterChange || resolvedtypes.str !== memo.types.str || listener !== memo.listener || resolvedOptions) {
        toggleListener(false);
        memo.emitter = resolvedEmitter;
        memo.types = resolvedtypes;
        memo.listener = listener;
        memo.options = resolvedOptions ?? memo.options;
        memo.deps = deps && [...deps];
        toggleListener(true);
      }
    }
  }

  return toggleListener;
}
