import type { _ } from '@/utils/types';

import { getStyle } from '@/gui/utils/dom/getStyle';

/**
 * Get a CSS property value of a DOM element.
 * @param el Element to get the CSS property from.
 * @param name Name of the property to get.
 * @returns The CSS property value as a string.
 */
export function getCssValue(el: _.Optional<_.Stylable>, name: string): string | null {
  return getStyle(el)?.getPropertyValue(name) ?? null;
}

export namespace getCssValue {
  /**
   * Get a CSS property value of a DOM element as a float.
   * @param el Element to get the CSS property from.
   * @param name Name of the property to get.
   * @returns The CSS property value as a float.
   */
  export function toFloat(el: _.Optional<_.Stylable>, name: string): number | null {
    const str = getCssValue(el, name);
    const num = str ? Number.parseFloat(str) : NaN;
    return isNaN(num) ? null : num;
  }
}
