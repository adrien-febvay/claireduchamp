import { StatefulComponent, SET_STATE, STATE } from './StatefulComponent';
import { StatelessComponent } from './StatelessComponent';

/**
 * Use component data storage (typically properties and/or state)
 * and provides helpers for the component lifecycle.
 *
 * The component data is accessible in inner functions without needing to call `useRef`.
 *
 * @param init Component initialization data.
 * @param update Component updated data.
 *
 * @returns An instance containing the component data and exposing helpers.
 *
 * @example
 * export const MyComponent = (props) => {
 *   const me = React.useComponent(() => ({ state: 0 }), { props });
 *   me.didRender(() => {
 *     console.log(`Just rendered using:`, me.props, me.state);
 *   })
 *   return (
 *     <>
 *       Count: {me.state}
 *       <button onClick={() => me.setState(me.state + 1)}>Increment</button>
 *     </>
 *   );
 * };
 */
export function useComponent<Init extends { state: unknown }, Update extends object>(
  init: () => Init,
  update?: Update | (() => Update),
): StatefulComponent<Init & Update> & Init & Update;

export function useComponent<Init extends object, Update extends { state: unknown }>(
  init: () => Init,
  update: Update | (() => Update),
): StatefulComponent<Init & Update> & Init & Update;

export function useComponent<Init extends object, Update extends object>(
  init: () => Init,
  update?: Update | (() => Update),
): StatelessComponent<Init & Update> & Init & Update;

export function useComponent(init: () => object, update?: object | (() => object)): StatelessComponent {
  const updateData = update instanceof Function ? update() : update;
  const updateState = updateData && 'state' in updateData;
  const component = React.useMemo(() => {
    const initData = init();
    const state = updateState || 'state' in initData;
    const instance = state ? new StatefulComponent() : new StatelessComponent();
    return Object.assign(instance, initData);
  }, []);
  const prev = component.prev === void 0 ? null : { ...component, prev: null };
  Object.assign(component, updateData);
  Object.defineProperty(component, 'prev', {
    configurable: true,
    enumerable: false,
    value: prev,
  });
  if (component instanceof StatefulComponent) {
    const value: unknown = component.state;
    if (!prev) {
      const setState = { enumerable: false, value: React.useState(value)[1] };
      const state = { configurable: true, enumerable: false, value };
      Object.defineProperty(component, SET_STATE, setState);
      Object.defineProperty(component, STATE, state);
    } else {
      [component.state] = React.useState(value);
      if (updateState) {
        component.setState(value);
      }
    }
  }
  return component;
}
