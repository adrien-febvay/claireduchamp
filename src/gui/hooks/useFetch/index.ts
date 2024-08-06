import { AbortablePromise } from '@/gui/utils/promise/Abortable';
import { mergeSimilarObjects } from '@/gui/utils/object/mergeSimilar';
import { TimeoutController } from '@/gui/utils/timeout/Controller';
import { mergeSignals } from './mergeSignals';

export const isAbort = Object.assign(
  function isAbort(error: unknown): boolean {
    return typeof error === 'string' && /^Abort: /.test(error);
  },
  { TIMEOUT: 'Abort: Timeout', UNMOUNT: 'Abort: Unmount' },
);

export function useFetch(defaultParams?: Params.WithoutUrl): [FetchFunction.WithUrl, typeof isAbort];

export function useFetch(defaultParams?: Params): [FetchFunction, typeof isAbort];

export function useFetch(defaultParams?: Params): [FetchFunction, typeof isAbort] {
  const memo = React.useMemo(() => ({ defaultParams, unmountController: new AbortController() }), []);

  async function fetch(params?: Params): Promise<Response> {
    const abortablePromise = new AbortablePromise<Response>();
    const mergedParams = mergeSimilarObjects(memo.defaultParams, params);
    const signals = [mergedParams?.signal].flat();
    const timeoutController = TimeoutController.create(mergedParams?.timeout, isAbort.TIMEOUT);
    const mergedSignal = mergeSignals(...signals, timeoutController, memo.unmountController);
    if (mergedParams?.url === void 0) {
      throw new TypeError('Expected { url: RequestInfo | URL } in parameters, got undefined');
    } else {
      try {
        return await window.fetch(mergedParams?.url, { ...mergedParams, signal: mergedSignal });
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === 'AbortError') {
          try {
            mergedSignal?.throwIfAborted();
          } catch (reason) {
            if (mergedParams?.throwOnUnmount || reason !== isAbort.UNMOUNT) {
              throw reason;
            } else {
              return new Promise(() => {});
            }
          }
        }
        throw cause;
      } finally {
        timeoutController?.stop();
      }
    }
    return abortablePromise;
  }

  React.useEffect(() => () => memo.unmountController.abort(isAbort.UNMOUNT), []);

  return [fetch, isAbort];
}
