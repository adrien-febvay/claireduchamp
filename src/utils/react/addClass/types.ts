import type { _ } from '@/utils/types';
import type { addClass as func } from '.';

declare module '.' {
  namespace addClass {
    /** DOM Element, React Element, or falsy value. */
    type Element = _.Optional<globalThis.Element | React.Node>;

    /** Maybe iterable of DOM Elements, React Elements, or falsy values. */
    type Elements = _.Iterable.Maybe<Element>;
  }
}

declare module 'react' {
  const addClass: typeof func;
  /** New classNames attribute on all elements. **/
  namespace addClass {
    /** DOM Element, React Element, or falsy value. */
    type Element = func.Element;

    /** Maybe iterable of DOM Elements, React Elements, or falsy values. */
    type Elements = func.Elements;
  }
}
