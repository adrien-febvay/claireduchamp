import type { _ } from '@/utils/types';
import type { useFetch } from '@/gui/hooks/useFetch';

declare module '.' {
  namespace useSingleFetch {
    type UniqueFetchFunction = (params?: Params) => Promise<Response>;

    namespace UniqueFetchFunction {
      type WithUrl = (params?: Params.WithUrl) => Promise<Response>;
    }

    type Params = _.Resolve<useFetch.Params & Params.Additional>;

    namespace Params {
      type Additional = {
        ifAlreadyRunning?: 'ignore' | 'restart';
        throwOnRestart?: boolean;
      };

      type Base = _.Resolve<useFetch.Params.Base & Additional>;

      type Url = useFetch.Params.Url;

      type WithoutUrl = _.Resolve<useFetch.Params.WithoutUrl & Additional>;

      type WithUrl = _.Resolve<useFetch.Params.WithUrl & Additional>;
    }
  }

  type UniqueFetchFunction = useSingleFetch.UniqueFetchFunction;

  namespace UniqueFetchFunction {
    type WithUrl = useSingleFetch.UniqueFetchFunction.WithUrl;
  }

  type Params = useSingleFetch.Params;

  namespace Params {
    type Base = useSingleFetch.Params.Base;

    type Url = useSingleFetch.Params.Url;

    type WithoutUrl = useSingleFetch.Params.WithoutUrl;

    type WithUrl = useSingleFetch.Params.WithUrl;
  }
}
