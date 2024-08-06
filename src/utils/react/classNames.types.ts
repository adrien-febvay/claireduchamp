import type { _ } from '@/utils/types';
import type { classNames as func } from './classNames';

declare module 'react' {
  const classNames: typeof func;
  /** New classNames attribute on all elements. **/
  namespace classNames {
    /** Index of optional class names (Dict<Optional<true>>). */
    type Index = _.Dict<_.Optional<true>>;

    /**
     * - Optional class name (Optional<string>),
     * - Index of optional class names (Dict<Optional<true>>),
     * - Recursive array of the above.
     * Helps managing element class names.
     */
    type Item = _.Optional<string> | Index | Item[];
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * - Optional class name (Optional<string>),
     * - Object indexing optional class names ({ [x: string]: Optional<true> }),
     * - Recursive array of the above.
     * Helps managing element class names.
     */
    classNames?: classNames.Item;
  }

  /** HTML Attributes. */
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * - Optional class name (Optional<string>),
     * - Index of optional class names ({ [x: string]: Optional<true> }),
     * - Recursive array of the above.
     * Helps managing element class names.
     */
    classNames?: classNames.Item;
  }
}

declare module './classNames' {
  type Index = React.classNames.Index;
  type Item = React.classNames.Item;
}
