import { _ } from '@/utils/types';

export function mergeSignals<Inputs extends readonly AbortInput[]>(...inputs: Inputs): MergedSignal<Inputs>;

export function mergeSignals<Inputs extends readonly AbortInput[]>(...inputs: Inputs): AbortSignal | null {
  const signals = inputs.filter(_.isTruthy).map((input) => (input instanceof AbortController ? input.signal : input));
  const firstSignal = signals[0];
  if (!firstSignal) {
    return null;
  } else if (signals.length === 1) {
    return firstSignal;
  } else {
    const controller = new AbortController();
    for (const signal of signals) {
      signal.addEventListener('abort', () => controller.abort(signal.reason));
    }
    return controller.signal;
  }
}
