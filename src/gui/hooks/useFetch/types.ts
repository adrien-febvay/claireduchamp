import type { _ } from '@/utils/types';
import type { useFetch } from '.';

declare module '.' {
  namespace useFetch {
    type AbortInput = _.Optional<AbortSignal | AbortController>;

    type FetchFunction = (params?: Params) => Promise<Response>;

    namespace FetchFunction {
      type WithUrl = (params?: Params.WithUrl) => Promise<Response>;
    }

    type Params = _.Resolve<Params.Base & Partial<Params.Url>>;

    namespace Params {
      type Base = _.Resolve<
        Omit<RequestInit, 'signal'> & {
          signal?: AbortInput | readonly AbortInput[];
          throwOnUnmount?: boolean | null;
          timeout?: _.Optional<number>;
        }
      >;

      type Url = { url: RequestInfo | URL };

      type WithoutUrl = _.Resolve<Base & { url?: undefined }>;

      type WithUrl = _.Resolve<Base & Url>;
    }
  }
  type AbortInput = useFetch.AbortInput;

  type FetchFunction = useFetch.FetchFunction;

  namespace FetchFunction {
    type WithUrl = useFetch.FetchFunction.WithUrl;
  }

  type Params = useFetch.Params;

  namespace Params {
    type Base = useFetch.Params.Base;

    type Url = useFetch.Params.Url;

    type WithoutUrl = useFetch.Params.WithoutUrl;

    type WithUrl = useFetch.Params.WithUrl;
  }
}

declare module './mergeSignals' {
  namespace mergeSignals {
    type AbortInput = useFetch.AbortInput;
  }

  type AbortInput = useFetch.AbortInput;

  type MergedSignal<Inputs extends readonly AbortInput[]> = _.Id<
    | (Extract<Inputs[number], _.Optional<never>> extends never ? never : null)
    | (Extract<Inputs[number], AbortSignal | AbortController> extends never ? never : AbortSignal)
  >;
}
