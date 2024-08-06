import type { _ } from '@/utils/types';

/**
 * Extends an index of CSS classes with others.
 * @param baseClasses The base index of CSS classes to extend.
 * @param additionalClasses The indexes of CSS classes to extend to include.
 * @returns An index of static classes (with clean `className`s).
 */
export function extendStyles<BaseClasses extends object>(
  baseClasses: BaseClasses,
  ...additionalClasses: React.Styles<BaseClasses>['styles'][]
): Static<BaseClasses> {
  const extendedStyles = { ...baseClasses } as Dict<string>;
  const flatClasses = additionalClasses.flat() as _.Optional<React.DynamicClasses<BaseClasses>>[];
  for (const name in extendedStyles) {
    const items = flatClasses.map((classes: _.Optional<React.DynamicClasses<_.Dict>>) =>
      classes ? classes[name] : null,
    );
    extendedStyles[name] = React.classNames((baseClasses as Dict<string>)[name], items) ?? '';
  }
  return extendedStyles as Static<BaseClasses>;
}
