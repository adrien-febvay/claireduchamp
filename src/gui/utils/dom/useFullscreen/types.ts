// Error without this line: Ambient module declaration cannot specify relative module name. ts(2436)
import { RefObject } from 'react';

declare module '.' {
  type Updater = (el: Element | null) => void;

  /**
   * Fullscreen mode information.
   * @property 0 - Is fullscreen mode active?
   * @property 1 - Element in fullscreen, `null` if none.
   */
  type FullscreenInformation = [isFullscreen: boolean, fullscreenElement: Element | null];
}

declare module './Fullscreen' {
  namespace Fullscreen {
    /** Fullscreen target: reference to element. */
    type Target = RefObject<Element>;
  }
}
