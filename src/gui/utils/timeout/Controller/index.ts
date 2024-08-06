import type { _ } from '@/utils/types';

import { TimeoutPromise } from '@/gui/utils/timeout/Promise';

export class TimeoutController extends AbortController {
  protected timeoutPromise?: TimeoutPromise | null;
  protected readonly reason: string;

  public constructor(delay: _.Optional<number>, reason = 'Timeout') {
    super();
    this.reason = reason;
    this.timeoutPromise = TimeoutPromise.create(delay);
    void this.timeoutPromise?.then(() => this.abort(reason));
  }

  public abort(reason = this.reason): void {
    super.abort(reason);
  }

  public stop(): void {
    this.timeoutPromise?.abort();
  }

  public static create(delay: _.Optional<number>, reason?: string): TimeoutController | null {
    return typeof delay === 'number' ? new TimeoutController(delay, reason) : null;
  }
}
