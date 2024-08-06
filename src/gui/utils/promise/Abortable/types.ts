import type { _ } from '@/utils/types';
import type { OpenPromise } from '../Open';

declare module '.' {
  interface AbortablePromise<Value, ExtraFulfillment = never> extends OpenPromise<Value, 'aborted' | ExtraFulfillment> {
    readonly abortCallback?: () => void;

    then<NewValue1 = Value, NewValue2 = never>(
      onFulfilled?: _.Nullish<OnFulfilled<Value, NewValue1>>,
      onReject?: _.Nullish<OnRejected<NewValue2>>,
    ): AbortablePromise<NewValue1 | NewValue2>;

    catch<NewValue>(onReject?: _.Nullish<OnRejected<NewValue>>): AbortablePromise<NewValue>;

    finally(onFinally: _.Nullish<OnFinally<Value>>): AbortablePromise<Value>;
  }

  namespace AbortablePromise {
    type AbortFunction = () => void;

    type Executor<Value> = (resolve: ResolveFunction<Value>, reject: RejectFunction, abort: AbortFunction) => void;

    type OnFulfilled<Value, NewValue> = OpenPromise.OnFulfilled<Value, NewValue>;

    type OnRejected<NewValue> = OpenPromise.OnRejected<NewValue>;

    type OnFinally<Value> = OpenPromise.OnFinally<Value>;

    type RejectFunction = OpenPromise.RejectFunction;

    type ResolveFunction<Value> = OpenPromise.ResolveFunction<Value>;
  }

  type AbortFunction = AbortablePromise.AbortFunction;

  type Executor<Value> = AbortablePromise.Executor<Value>;

  type OnFulfilled<Value, NewValue> = AbortablePromise.OnFulfilled<Value, NewValue>;

  type OnRejected<NewValue> = AbortablePromise.OnRejected<NewValue>;

  type OnFinally<Value> = AbortablePromise.OnFinally<Value>;

  type RejectFunction = AbortablePromise.RejectFunction;

  type ResolveFunction<Value> = AbortablePromise.ResolveFunction<Value>;
}
