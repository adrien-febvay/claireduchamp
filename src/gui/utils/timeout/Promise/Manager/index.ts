import type { _ } from '@/utils/types';

import { mergeSimilarObjects } from '@/gui/utils/object/mergeSimilar';
import { TimeoutPromise } from '@/gui/utils/timeout/Promise';

function voidFunction(): void {}

export class TimeoutPromiseManager {
  public params: Params;
  public timeoutPromise: TimeoutPromise | null = null;

  public constructor(params?: Argument) {
    this.params = { delay: NaN, ...TimeoutPromise.resolveParams(params) };
  }

  public abort(reject: _.Nullish<boolean>): this;
  public abort(reason?: string, reject?: _.Nullish<boolean>): this;
  public abort(arg0?: _.Nullish<string | boolean>, arg1?: _.Nullish<boolean>): this {
    this.timeoutPromise?.abort(arg0 as string, arg1);
    return this;
  }

  public end(): this {
    this.timeoutPromise?.end();
    return this;
  }

  public start(params?: Argument): TimeoutPromise | null {
    if (this.timeoutPromise) {
      return null;
    } else {
      const newParams = mergeSimilarObjects(this.params, TimeoutPromise.resolveParams(params));
      this.timeoutPromise = TimeoutPromise.create(newParams);
      this.timeoutPromise?.finally(() => (this.timeoutPromise = null)).catch(voidFunction);
      return this.timeoutPromise;
    }
  }

  public restart(params?: Argument): TimeoutPromise | null {
    this.timeoutPromise?.abort();
    return this.start(params);
  }

  public static resolveParams(params: Argument | undefined): Partial<Params> {
    return TimeoutPromise.resolveParams(params);
  }
}
