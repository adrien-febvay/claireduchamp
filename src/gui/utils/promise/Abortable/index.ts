import type { _ } from '@/utils/types';

import { OpenPromise } from '../Open';

function voidFunction(): void {}

export class AbortablePromise<Value, ExtraFulfillment = never> extends OpenPromise<
  Value,
  'aborted' | ExtraFulfillment
> {
  /**
   * Creates a new abortable Promise.
   * @param executor A callback used to initialize the abortable promise.
   *
   * The executor is passed three arguments:
   * - A resolve callback used to resolve the promise with a value or the result of another promise;
   * - A reject callback used to reject the promise with a provided reason or error.
   * - An abort callback used to abort the promise.
   */
  public constructor(executor?: Executor<Value>) {
    super();
    void Object.defineProperty(this, 'abortCallback', {
      enumerable: false,
      value: executor?.(this.resolve.bind(this), this.reject.bind(this), this.abort.bind(this)),
    });
    if (this.fulfillment === 'aborted') {
      this.abortCallback?.();
    }
  }

  /** Aborts the promise. */
  public abort(): void {
    if (!this.fulfillment) {
      void Object.defineProperties(this, {
        fulfillment: { value: 'aborted' },
        legacyReject: { enumerable: false, value: voidFunction },
        legacyResolve: { enumerable: false, value: voidFunction },
      });
      this.abortCallback?.();
    }
  }

  /**
   * Creates an open promise from a promise-like object.
   * @param promise The promise-like object to create the open promise from.
   * @returns An open promise whose internal state matches the provided promise.
   */
  public static from<ExtraFulfillment = never>(promise: _.Promise.Like<void>): AbortablePromise<void, ExtraFulfillment>;

  public static from<Value, ExtraFulfillment = never>(
    promise: _.Promise.Like<Value>,
  ): AbortablePromise<Value, ExtraFulfillment>;

  public static from<Value, ExtraFulfillment = never>(
    promise: _.Promise.Like<Value>,
  ): AbortablePromise<Value, ExtraFulfillment> {
    const openPromise = new AbortablePromise<Value, ExtraFulfillment>();
    // eslint-disable-next-line promise/catch-or-return
    promise.then(
      (value) => openPromise.resolve(value),
      (reason) => openPromise.reject(reason),
    );
    return openPromise;
  }

  /**
   * Creates a new resolved abortable promise for the provided value, if provided.
   * @param value The value to set the internal state of the abortable promise to.
   * @returns An abortable promise whose internal state matches the provided value.
   */
  public static resolve<ExtraFulfillment = never>(): AbortablePromise<void, ExtraFulfillment>;

  public static resolve<Value, ExtraFulfillment = never>(
    value?: _.Promise.Like.Or<Value>,
  ): AbortablePromise<Awaited<Value>, ExtraFulfillment>;

  public static resolve<ExtraFulfillment = never>(value?: unknown): AbortablePromise<unknown, ExtraFulfillment> {
    return new AbortablePromise((resolve) => resolve(value));
  }

  /**
   * Creates a new rejected abortable promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected abortable promise.
   */
  public static reject<ExtraFulfillment = never>(): AbortablePromise<never, ExtraFulfillment>;

  public static reject<Value = never, ExtraFulfillment = never>(
    reason?: unknown,
  ): AbortablePromise<Value, ExtraFulfillment>;

  public static reject<Value = never, ExtraFulfillment = never>(
    reason?: unknown,
  ): AbortablePromise<Value, ExtraFulfillment> {
    return new AbortablePromise((_resolve, reject) => reject(reason));
  }
}
