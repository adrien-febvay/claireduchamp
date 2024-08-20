import { onEvent } from '@/gui/hooks/onEvent';
import { useDevice } from '@/gui/hooks/useDevice';

export const defaultSizes = [['large'], ['medium', 860], ['small', 320]] as const;

function defaultInitializer(): Sizes.Default {
  return defaultSizes;
}

export function useDeviceSize(): Sizes.Default[number][0];

export function useDeviceSize<Sizes extends useDeviceSize.Sizes>(
  initializer: Initializer<Sizes>,
  deps?: readonly unknown[],
): Sizes[number][0];

export function useDeviceSize(initializer: Initializer<Sizes> = defaultInitializer, deps?: readonly unknown[]): string {
  const [[defaultSize], ...sizes] = React.useMemo(initializer, deps ?? []);
  const [deviceSize, setDeviceSize] = React.useState(getDeviceSize);

  onEvent(useDevice().mobile && window, 'resize', updateDeviceSize);

  function getDeviceSize(): string {
    let sizeName = defaultSize;
    for (const [name, limit] of sizes) {
      if (innerWidth && innerWidth > limit) {
        break;
      }
      sizeName = name;
    }
    return sizeName;
  }

  function updateDeviceSize(): void {
    setDeviceSize(getDeviceSize());
  }

  return deviceSize;
}
