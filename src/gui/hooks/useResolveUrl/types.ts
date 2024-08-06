import type { _ } from '@/utils/types';
import type { Screen } from '@/gui/screens';

declare module '.' {
  namespace useResolveUrl {
    type LinkAttrs = {
      url: string;
      noFollow?: boolean;
    };

    type Params<Target extends useResolveUrl.Target> = _.Url.To.Params<Target.Pathname<Target>>;

    namespace Params {
      type Any = _.Url.Params.Any;

      type Mandatory<Target extends useResolveUrl.Target> = _.If.Not.Never<
        [_.Url.To.ParamKey.Mandatory<Target.Pathname<Target>>],
        _.Url.To.Params<Target.Pathname<Target>>
      >;
      type Optional<Target extends useResolveUrl.Target> = _.If.Never<
        [_.Url.To.ParamKey.Mandatory<Target.Pathname<Target>>],
        _.Url.To.Params<Target.Pathname<Target>>
      >;
    }

    namespace ReturnType {
      type Mandatory<Target extends useResolveUrl.Target> = _.If.Not.Never<
        [_.Url.To.ParamKey.Mandatory<Target.Pathname<Target>>],
        string
      >;
      type Optional<Target extends useResolveUrl.Target> = _.If.Never<
        [_.Url.To.ParamKey.Mandatory<Target.Pathname<Target>>],
        string
      >;
    }

    type Target = string | Target.Route;

    namespace Target {
      /** Pathname of link's `Target`. */
      type Pathname<Target extends useResolveUrl.Target> = Target extends string
        ? _.Url.To.Pathname<Target>
        : Target extends Screen.Route
          ? Route.Pathname<Target>
          : Target extends { route: Screen.Route }
            ? Route.Pathname<Target['route']>
            : never;

      /** Internal route. */
      type Route = (Screen.Route & { route?: undefined }) | { route: Screen.Route };

      namespace Route {
        /** Pathname of `Route`. */
        type Pathname<Route extends Screen.Route> = Exclude<
          Route[Extract<keyof Route, keyof Screen.Route>],
          undefined
        >['pathname'];
      }
    }
  }

  type LinkAttrs = useResolveUrl.LinkAttrs;

  type Params<Target extends useResolveUrl.Target> = useResolveUrl.Params<Target>;

  namespace Params {
    type Any = useResolveUrl.Params.Any;

    type Mandatory<Target extends useResolveUrl.Target> = useResolveUrl.Params.Mandatory<Target>;

    type Optional<Target extends useResolveUrl.Target> = useResolveUrl.Params.Optional<Target>;
  }

  namespace ReturnType {
    type Mandatory<Target extends useResolveUrl.Target> = useResolveUrl.ReturnType.Mandatory<Target>;

    type Optional<Target extends useResolveUrl.Target> = useResolveUrl.ReturnType.Optional<Target>;
  }

  type Target = useResolveUrl.Target;

  namespace Target {
    /** Pathname of link's `Target`. */
    type Pathname<Target extends useResolveUrl.Target> = useResolveUrl.Target.Pathname<Target>;

    /** Internal route. */
    type Route = useResolveUrl.Target.Route;

    namespace Route {
      /** Pathname of `Route`. */
      type Pathname<Route extends Screen.Route> = useResolveUrl.Target.Route.Pathname<Route>;
    }
  }
}
