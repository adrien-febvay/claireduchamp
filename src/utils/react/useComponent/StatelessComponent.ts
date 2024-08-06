export class StatelessComponent {
  /**
   * Executes a callback function when the component has been mounted.
   * @param cb Callback function to execute.
   */
  public didMount(cb: React.EffectCallback): void {
    React.useEffect(cb, []);
  }

  /**
   * Executes a callback function when the component has been rendered.
   * @param cb Callback function to execute.
   */
  public didRender(cb: React.EffectCallback): void {
    React.useEffect(cb);
  }

  /**
   * Executes a callback function when the component has been updated.
   * @param cb Callback function to execute.
   */
  public didUpdate(cb: React.EffectCallback): void {
    React.useEffect(() => {
      if (this.prev) {
        cb();
      }
    });
  }

  /**
   * Executes a callback function when the component has been unmounted.
   * @param cb Callback function to execute.
   */
  public didUnmount(cb: () => void): void {
    React.useEffect(() => cb, []);
  }
}

export interface StatelessComponent<Data extends object = object> {
  /** Previous component data (properties, state, ...). */
  prev: Data & { prev: null };
}
