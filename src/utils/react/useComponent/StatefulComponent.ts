import { _ } from '@/utils/types';
import { StatelessComponent } from './StatelessComponent';

export const STATE = Symbol('state');
export const SET_STATE = Symbol('setState');

export class StatefulComponent<Data extends { state: unknown } = { state: unknown }> extends StatelessComponent<Data> {
  /** Current component state. */
  public state!: Data['state'];

  /**
   * Updates the component state.
   * @param state New state, possibly partial.
   */
  public updateState(state: Partial<Data['state']>): void {
    let value = this[STATE];
    value = _.isObject(value) ? { ...value, ...state } : state;
    this.setState(value);
  }

  /**
   * Sets the component state.
   * @param state New state.
   */
  public setState(state: Data['state']): void {
    Object.defineProperty(this, STATE, {
      configurable: true,
      enumerable: false,
      value: state,
    });
    this[SET_STATE](state);
  }
}

export interface StatefulComponent<Data extends { state: unknown } = { state: unknown }> {
  /** Updated component state for merging. */
  [STATE]: Data['state'];

  /**
   * Sets the component state.
   * @param state New state.
   */
  [SET_STATE]: React.Dispatch<React.SetStateAction<Data['state']>>;
}
