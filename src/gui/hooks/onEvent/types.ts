import type { _ } from '@/utils/types';

declare module '.' {
  namespace onEvent {
    type Emitter = _.Event.Emitter.Generic;

    namespace Emitter {
      type Maybe<Emitter extends onEvent.Emitter = onEvent.Emitter> = _.Optional<Emitter>;

      namespace Or {
        type Ref<Emitter extends onEvent.Emitter = onEvent.Emitter> = _.Optional<Emitter | Emitter.Ref<Emitter>>;
      }

      type Ref<Emitter extends onEvent.Emitter = onEvent.Emitter> = React.RefObject<Emitter>;
    }

    type Toggler = (active?: boolean) => boolean;
  }

  type Emitter = _.Event.Emitter.Generic;

  namespace Emitter {
    type Maybe<Emitter extends onEvent.Emitter = onEvent.Emitter> = onEvent.Emitter.Maybe<Emitter>;

    namespace Or {
      type Ref<Emitter extends onEvent.Emitter = onEvent.Emitter> = onEvent.Emitter.Or.Ref<Emitter>;
    }

    type Ref<Emitter extends onEvent.Emitter = onEvent.Emitter> = onEvent.Emitter.Ref<Emitter>;
  }

  type Toggler = onEvent.Toggler;
}
