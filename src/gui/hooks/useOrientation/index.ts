import type { _ } from '@/utils/types';

import { onEvent } from '@/gui/hooks/onEvent';
import { useMobileDetection } from '../useMobileDetection';

export function useOrientation(override?: _.Nullish<OverrideFunction>): Orientation {
  const isMobile = useMobileDetection();
  const [orientation, setOrientation] = React.useState(getOrientation);
  onEvent(window, 'resize', updateOrientation);

  function getOrientation(): Orientation {
    return override?.() || ((window ? window.innerWidth < window.innerHeight : isMobile) ? 'portrait' : 'landscape');
  }

  function updateOrientation(): void {
    setOrientation(getOrientation());
  }

  return orientation;
}
