// Challenge: accept any CssExports interface,
// so an interface with only string members.
// Only solution found ATM: turn return type to never upon bad CssExports.

// Another solution would be to find a way to have CssExports as mapped types
// instead of interfaces, because they extend Dict<string> and would allow
// for clean code. Unfortunately the module css-modules-typescript-loader
// is not customizable. This solution would require to fork the module,
// or find a way to change the declaration files as soon as they are
// created/updated.

import type { _ } from '@/utils/types';
import type { extendStyles as func } from './extendStyles';

declare module 'react' {
  const extendStyles: typeof func;

  namespace extendStyles {
    /**
     * - Optional class name (Optional<string>),
     * - Index of optional class names (Dict<Optional<true>>),
     * - Recursive array of the above.
     * Helps managing element class names.
     */
    type Item = React.classNames.Item;
  }

  /**
   * Dynamic index of `classNames.Item` to extend an index of `className`.
   * @param ClassNames The index of `className` to extend.
   */
  type DynamicClasses<BaseClasses extends object> = {
    [Key in keyof BaseClasses]?: extendStyles.Item;
  };

  /**
   * Default `styles` property.
   * @param CssImports The CSS interface the provided styles extend.
   */
  interface Styles<BaseClasses extends object> {
    styles?: _.Optional<DynamicClasses<BaseClasses>> | _.Optional<DynamicClasses<BaseClasses>>[];
  }
}

declare module './extendStyles' {
  type Static<BaseClasses extends object> = {
    [Key in keyof BaseClasses]: BaseClasses[Key] extends React.classNames.Item ? never : Key;
  }[keyof BaseClasses] extends never
    ? { [Key in Extract<keyof BaseClasses, string>]?: string }
    : never;
}
