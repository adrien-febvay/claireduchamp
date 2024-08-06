import type { Link as LegacyLink } from 'react-router-dom';
import type { _ } from '@/utils/types';
import type { useResolveUrl } from '@/gui/hooks/useResolveUrl';
import type { Link as Component } from '.';

declare module '.' {
  namespace Link {
    /** <Link> properties. */
    type Props<To extends Props.To = Props.To> = _.Object.Assign.Multi<
      Props.Legacy,
      [
        {
          state?: unknown;

          /** Link target. */
          to: To;
        },
        Props.Params.Prop<To>,
      ]
    >;

    namespace Props {
      type Legacy = React.InferProps<typeof LegacyLink>;

      /** Params of link's target `To`. */
      type Params<To extends Props.To> = useResolveUrl.Params<To>;

      namespace Params {
        type Prop<To extends Props.To> = _.If.Never<
          [_.Url.To.ParamKey.Mandatory<useResolveUrl.Target.Pathname<To>>],
          { params?: _.Url.To.Params<useResolveUrl.Target.Pathname<To>> },
          { params: _.Url.To.Params<useResolveUrl.Target.Pathname<To>> }
        >;
      }

      /** Link target. */
      type To = useResolveUrl.Target;
    }
  }

  /** On click event handler arguments. */
  type OnClickParameters = Parameters<Exclude<Props['onClick'], undefined>>;

  /** Internal component properties. */
  type Props = Component.Props;
}
