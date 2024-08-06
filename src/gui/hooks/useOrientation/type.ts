import type { _ } from '@/utils/types';

declare module '.' {
  namespace useOrientation {
    type Orientation = 'portrait' | 'landscape';

    type OverrideFunction = () => _.Optional<Orientation>;
  }

  type Orientation = useOrientation.Orientation;

  type OverrideFunction = useOrientation.OverrideFunction;
}
