/** Layout context. */
export const Context = React.createContext<Context.Value>({
  reset: () => {},
  to: () => {},
});

export namespace Context {
  /** Resets document scroll position. */
  export type Reset = () => void;

  /**
   * Scrolls to element/position.
   * @param target Element/position to scroll to.
   * @param behavior Scrolling behavior.
   */
  export type To = (target: HTMLElement | string | null | undefined | number, behavior?: ScrollBehavior) => void;

  export type Value = {
    /** Resets document scroll position. */
    reset: Reset;

    /**
     * Scrolls to element/position.
     * @param target Element/position to scroll to.
     * @param behavior Scrolling behavior.
     */
    to: To;
  };
}
