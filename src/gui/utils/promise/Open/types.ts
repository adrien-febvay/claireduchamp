import type { _ } from '@/utils/types';

declare module '.' {
  interface OpenPromise<Value, ExtraFulfillment = never> {
    readonly fulfillment?: 'resolved' | 'rejected' | ExtraFulfillment;
    readonly value?: Value;
    readonly reason?: unknown;

    legacyResolve(this: void, value: _.Promise.Like.Or<Value>): void;
    legacyReject(this: void, reason: unknown): void;

    then<NewValue1 = Value, NewValue2 = never>(
      onFulfilled?: _.Nullish<OnFulfilled<Value, NewValue1>>,
      onReject?: _.Nullish<OnRejected<NewValue2>>,
    ): OpenPromise<NewValue1 | NewValue2, ExtraFulfillment>;

    catch<NewValue>(onReject?: _.Nullish<OnRejected<NewValue>>): OpenPromise<NewValue, ExtraFulfillment>;

    finally(onFinally: _.Nullish<OnFinally<Value>>): OpenPromise<Value, ExtraFulfillment>;
  }

  namespace OpenPromise {
    type Executor<Value> = (resolve: ResolveFunction<Value>, reject: RejectFunction) => void;

    type OnFulfilled<Value, NewValue> = (value: Value) => _.Promise.Like.Or<NewValue>;

    type OnRejected<NewValue> = (reason: unknown) => _.Promise.Like.Or<NewValue>;

    type OnFinally<Value> = (value: Value) => void;

    type RejectFunction = (reason: unknown) => void;

    type ResolveFunction<Value> = (value: _.Promise.Like.Or<Value>) => void;
  }

  type Executor<Value> = OpenPromise.Executor<Value>;

  type OnFulfilled<Value, NewValue> = OpenPromise.OnFulfilled<Value, NewValue>;

  type OnRejected<NewValue> = OpenPromise.OnRejected<NewValue>;

  type OnFinally<Value> = OpenPromise.OnFinally<Value>;

  type RejectFunction = OpenPromise.RejectFunction;

  type ResolveFunction<Value> = OpenPromise.ResolveFunction<Value>;
}
