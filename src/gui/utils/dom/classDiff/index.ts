import type { _ } from '@/utils/types';

/**
 * Remove classes from a class string.
 * @param className Class string to modify.
 * @param classNames Classes to remove.
 */
export function classDiff(className: _.Optional<string>, ...classNames: _.Optional<string>[]): string {
  const classes = new Set<string>();
  if (className) {
    for (const classNameElement of className.trim().split(/\s+/)) {
      classes.add(classNameElement);
    }
    for (const className of classNames) {
      if (className && classes.size) {
        for (const classNameElement of className.trim().split(/\s+/)) {
          classes.delete(classNameElement);
        }
      }
    }
  }
  return [...classes].join(' ');
}
