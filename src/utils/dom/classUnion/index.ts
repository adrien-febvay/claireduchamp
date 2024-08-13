import type { _ } from '@/utils/types';

/**
 * Make an union of classes.
 * @param classNames Classes to merge.
 */
export function classUnion(...classNames: _.Optional<string>[]): string {
  const classes = new Set<string>();
  for (const className of classNames) {
    if (className) {
      for (const classNameElement of className.trim().split(/\s+/)) {
        classes.add(classNameElement);
      }
    }
  }
  return [...classes].join(' ');
}
