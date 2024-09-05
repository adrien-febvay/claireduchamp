/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { AbortablePromise } from '@/gui/utils/promise/Abortable';
import { mergeSimilarObjects } from '@/gui/utils/object/mergeSimilar';
import { isAbort as isFetchAbort, useFetch } from '@/gui/hooks/useFetch';

const isAbort = Object.assign(isFetchAbort, { RESTART: 'Abort: Restart' });

export function useSingleFetch(defaultParams?: Params.WithoutUrl): [UniqueFetchFunction.WithUrl, typeof isAbort];

export function useSingleFetch(defaultParams?: Params): [UniqueFetchFunction, typeof isAbort];

export function useSingleFetch(defaultParams?: Params): [UniqueFetchFunction, typeof isAbort] {
  const fetch = useFetch()[0];
  const memo = React.useMemo(
    () => ({
      defaultParams,
      dedupController: null as AbortController | null,
      request: null as Promise<Response> | null,
    }),
    [],
  );

  function singleFetch(params?: Params): Promise<Response> {
    const abortablePromise = new AbortablePromise<Response>();
    const mergedParams = mergeSimilarObjects(memo.defaultParams, params);
    if (!memo.request || mergedParams?.ifAlreadyRunning !== 'ignore') {
      memo.dedupController?.abort(isAbort.RESTART);
      memo.dedupController = new AbortController();
      const signal = [...[mergedParams?.signal].flat(), memo.dedupController?.signal];
      memo.request = fetch({ ...mergedParams, signal } as Params.WithUrl);
    }
    memo.request
      .finally(() => (memo.request = null))
      .then((response) => abortablePromise.resolve(response))
      .catch((cause) => {
        if (mergedParams?.throwOnRestart || cause !== isAbort.RESTART) {
          abortablePromise.reject(cause);
        } else {
          abortablePromise.abort();
        }
      });
    return abortablePromise;
  }

  return [singleFetch, isAbort];
}
