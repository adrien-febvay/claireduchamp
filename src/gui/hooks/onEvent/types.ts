import type { _ } from '@/utils/types';
import type { onEvent as ns } from '.';

declare module '.' {
  namespace onEvent {
    type MaybeHostOrRef<Host extends AnyHost = AnyHost> = _.Optional<Host | React.RefObject<Host>>;

    type Toggler = (active?: boolean) => boolean;
  }

  type AnyHost = _.Event.Host.Generic;

  type HostRef = React.RefObject<_.Event.Host.Generic>;

  type MaybeHost<Host extends AnyHost = AnyHost> = _.Optional<Host>;

  type MaybeHostOrRef<Host extends AnyHost = AnyHost> = ns.MaybeHostOrRef<Host>;

  type Toggler = ns.Toggler;
}
