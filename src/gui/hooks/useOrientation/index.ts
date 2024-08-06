import type { _ } from '@/utils/types';

import { onEvent } from '@/gui/hooks/onEvent';
import { useMobileDetection } from '../useMobileDetection';

export function useOrientation(override?: _.Nullish<OverrideFunction>): Orientation {
  const isMobile = useMobileDetection();
  const [orientation, setOrientation] = React.useState(getOrientation);
  onEvent(typeof window !== 'undefined' && window, 'resize', updateOrientation);

  function getOrientation(): Orientation {
    return (
      override?.() || ((typeof window === 'undefined' ? isMobile : innerWidth < innerHeight) ? 'portrait' : 'landscape')
    );
  }

  function updateOrientation(): void {
    setOrientation(getOrientation());
  }

  return orientation;
}
