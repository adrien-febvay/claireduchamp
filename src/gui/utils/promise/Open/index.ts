import type { _ } from '@/utils/types';

function voidFunction(): void {}

export class OpenPromise<Value> extends Promise<Value> {
  /**
   * Creates a new open Promise.
   * @param executor A callback used to initialize the open promise.
   *
   * The executor is passed two arguments:
   * - A resolve callback used to resolve the promise with a value or the result of another promise;
   * - A reject callback used to reject the promise with a provided reason or error.
   */
  public constructor(executor?: Executor<Value>) {
    let legacyResolve: ResolveFunction<Value> = voidFunction;
    let legacyReject: RejectFunction = voidFunction;
    super((resolve, reject) => {
      legacyResolve = resolve;
      legacyReject = reject;
    });
    void Object.defineProperties(this, {
      legacyResolve: { enumerable: false, value: legacyResolve, configurable: true },
      legacyReject: { enumerable: false, value: legacyReject, configurable: true },
    });
    executor?.(this.resolve.bind(this), this.reject.bind(this));
  }

  /**
   * Resolves the open promise with the provided value.
   * @param value The value to resolve the open promise to.
   */
  public resolve(value: _.Promise.Like.Or<Value>): void {
    if (!this.fulfillment) {
      Promise.resolve(value)
        .then((value) => {
          void Object.defineProperties(this, {
            fulfillment: { value: 'resolved' },
            value: { value: value },
          });
        })
        .catch(voidFunction);
      this.legacyResolve(value);
    }
  }

  /**
   * Rejects the open promise for the provided reason.
   * @param reason The reason the promise is rejected.
   */
  public reject(reason: unknown): void {
    if (!this.fulfillment) {
      void Object.defineProperties(this, {
        fulfillment: { value: 'resolved' },
        reason: { value: reason },
      });
      this.legacyReject(reason);
    }
  }

  /**
   * Creates an open promise from a promise-like object.
   * @param promise The promise-like object to create the open promise from.
   * @returns An open promise whose internal state matches the provided promise.
   */
  public static from<Value, ExtraFulfillment = never>(
    promise: _.Promise.Like<Value>,
  ): OpenPromise<Value, ExtraFulfillment> {
    const openPromise = new OpenPromise<Value, ExtraFulfillment>();
    // eslint-disable-next-line promise/catch-or-return
    promise.then(
      (value) => openPromise.resolve(value),
      (reason) => openPromise.reject(reason),
    );
    return openPromise;
  }

  /**
   * Creates a new resolved open promise for the provided value, if provided.
   * @param value The value to set the internal state of the open promise to.
   * @returns An open promise whose internal state matches the value.
   */
  public static resolve<ExtraFulfillment = never>(): OpenPromise<void, ExtraFulfillment>;

  public static resolve<Value, ExtraFulfillment = never>(
    value?: _.Promise.Like.Or<Value>,
  ): OpenPromise<Awaited<Value>, ExtraFulfillment>;

  public static resolve<ExtraFulfillment = never>(value?: unknown): OpenPromise<unknown, ExtraFulfillment> {
    return new OpenPromise((resolve) => resolve(value));
  }

  /**
   * Creates a new rejected open promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected open promise.
   */
  public static reject<Value = never, ExtraFulfillment = never>(
    reason?: unknown,
  ): OpenPromise<Value, ExtraFulfillment> {
    return new OpenPromise((_resolve, reject) => reject(reason));
  }
}
