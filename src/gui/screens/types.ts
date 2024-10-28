import type { Layout } from '@/gui/support/Layout';
import type { FlatNamespace, Locales, Resources } from '@/utils/i18n';
import type { _ } from '@/utils/types';

declare module '.' {
  type Screen = Layout.Props['Screen'] & Screen.Route.Props;

  namespace Screen {
    type Meta = {
      description?: string;
      goto?: string;
      keywords?: string;
      noFollow?: boolean;
      pathname: string;
      params?: _.Dict<string>;
      title?: string;
    };

    namespace Meta {
      type Namespace = Filter<Resources, FlatNamespace>;

      type Filter<
        Resources extends { [_Key in Key]: object },
        Key extends Extract<keyof Resources, string> = Extract<keyof Resources, string>,
      > = {
        [_Key in Key]: Resources[_Key] extends Meta ? _Key : never;
      }[Key];
    }

    type Route =
      | (Partial<Locales<undefined>> & { mul: Screen.Meta })
      | (Partial<Locales<Screen.Meta>> & { fr: Screen.Meta; mul?: undefined });

    namespace Route {
      type Props =
        | { readonly route: Route; readonly subroutes?: Route[] }
        | { readonly route?: Route; readonly subroutes: Route[] };
    }
  }
}
