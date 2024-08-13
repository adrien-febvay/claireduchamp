import type { _ } from '@/utils/types';

import { classDiff } from '../classDiff';

/**
 * Remove classes from an element.
 * @param el Element to remove classes from.
 * @param classNames Classes to remove.
 */
export function removeClass(el: _.Optional<Element>, ...classNames: _.Optional<string>[]): void {
  if (el && classNames.length) {
    el.className = classDiff(el.className, ...classNames);
  }
}
