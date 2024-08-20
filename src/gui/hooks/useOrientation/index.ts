import { onEvent } from '@/gui/hooks/onEvent';
import { useDevice } from '@/gui/hooks/useDevice';

export function useOrientation(): Orientation {
  const device = useDevice();
  const [orientation, setOrientation] = React.useState(getOrientation);

  onEvent(device.responsive && window, 'resize', updateOrientation);

  function getOrientation(): Orientation {
    const portrait = device.responsive && (innerWidth && innerHeight ? innerWidth < innerHeight : device.mobile);
    return portrait ? 'portrait' : 'landscape';
  }

  function updateOrientation(): void {
    setOrientation(getOrientation());
  }

  return orientation;
}
