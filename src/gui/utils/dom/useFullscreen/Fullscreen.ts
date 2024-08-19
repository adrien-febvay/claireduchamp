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
  public async toggle(enable?: boolean, ignoreError = true): Promise<void> {
    if (enable == null || enable !== this.active) {
      if (enable ?? !this.active) {
        const req = this.element.current?.requestFullscreen();
        await (ignoreError ? req?.catch(() => {}) : req);
      } else {
        await document?.exitFullscreen();
      }
    }
  }
}
