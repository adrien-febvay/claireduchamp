/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import type { _ } from '@/utils/types';

import EventEmitter from 'events';

function voidFunction(): void {}
type VoidFunction = () => void;

export class TimeoutPromise extends Promise<void> {
  private eventEnitter = new EventEmitter();

  public constructor(params: Argument);

  public constructor(params: Argument | typeof executor) {
    let legacyResolve = voidFunction;
    let legacyReject = voidFunction;
    function executor(resolve: VoidFunction, reject: VoidFunction): void {
      legacyResolve = resolve;
      legacyReject = reject;
    }
    if (params instanceof Function) {
      super(params);
      Object.setPrototypeOf(this, Promise.prototype);
    } else {
      super(executor);
      const { delay, throwOnAbort } = TimeoutPromise.resolveParams(params);
      void Object.defineProperties(this, {
        resolve: { enumerable: false, value: legacyResolve },
        reject: { enumerable: false, value: legacyReject },
        timeout: { enumerable: false, value: setTimeout(this.end.bind(this), delay) },
        throwOnAbort: { enumerable: false, value: throwOnAbort ?? false },
      });
    }
  }

  public abort(reject: _.Nullish<boolean>): void;
  public abort(reason?: string, reject?: _.Nullish<boolean>): void;
  public abort(arg0?: _.Nullish<string | boolean>, arg1?: _.Nullish<boolean>): void {
    const reason = typeof arg0 === 'string' ? arg0 : '';
    const reject = arg1 ?? (typeof arg0 === 'boolean' ? arg0 : null);
    if (this.aborted === void 0) {
      void Object.defineProperty(this, 'aborted', { enumerable: false, value: true });
      clearTimeout(this.timeout);
      this.eventEnitter.emit('abort');
      if ((this.throwOnAbort && reject !== false) || reject === true) {
        this.reject(`Aborted${reason && ': '}${reason}`);
      }
    }
  }

  public end(): void {
    if (this.aborted === void 0) {
      void Object.defineProperty(this, 'aborted', { enumerable: false, value: false });
      clearTimeout(this.timeout);
      this.resolve();
    }
  }

  public onAbort(callback: () => void): this {
    this.eventEnitter.on('abort', callback);
    return this;
  }

  public static create(params: _.Optional<Partial<Argument>>): TimeoutPromise | null {
    const resolvedParams = TimeoutPromise.resolveParams(params);
    return resolvedParams.delay === void 0 ? null : new TimeoutPromise(resolvedParams as Params);
  }

  public static resolveParams(params: _.Optional<Partial<Argument>>): Partial<Params> {
    if (params && typeof params === 'object') {
      return params;
    } else {
      return params || params === 0 ? { delay: params } : {};
    }
  }
}
