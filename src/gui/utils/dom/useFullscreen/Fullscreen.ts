import type { _ } from '@/utils/types';

export class Fullscreen {
  public readonly element: React.RefObject<_.Nullish<Element>>;

  public constructor(element: Fullscreen.Target) {
    this.element = element;
  }

  /** Is fullscreen active? */
  public get active(): boolean {
    return document?.fullscreenElement === (this.element.current ?? false);
  }

  /**
   * Toggle fullscreen mode.
   * @param enable Enter fullscreen? Otherwise exit it.
   * @returns A void promise.
   */
  public async toggle(enable?: boolean): Promise<void> {
    if (enable == null || enable !== this.active) {
      if (enable ?? !this.active) {
        await this.element.current?.requestFullscreen();
      } else {
        await document?.exitFullscreen();
      }
    }
  }
}
