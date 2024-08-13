import type { _ } from '@/utils/types';

import { classUnion } from '../classUnion';

/**
 * Add classes to an element.
 * @param el Element to add classes to.
 * @param classNames Classes to add.
 */
export function addClass(el: _.Optional<Element>, ...classNames: _.Optional<string>[]): void {
  if (el && classNames.length) {
    el.className = classUnion(el.className, ...classNames);
  }
}
