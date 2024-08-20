import { onEvent } from '@/gui/hooks/onEvent';
import { useMobileDetection } from '../useMobileDetection';

export function useOrientation(): Orientation {
  const isMobile = useMobileDetection();
  const [orientation, setOrientation] = React.useState(getOrientation);
  onEvent(window, 'resize', updateOrientation);

  function getOrientation(): Orientation {
    return (window ? window.innerWidth < window.innerHeight : isMobile) ? 'portrait' : 'landscape';
  }

  function updateOrientation(): void {
    setOrientation(getOrientation());
  }

  return orientation;
}
