import type { _ } from '@/utils/types';

import { getMargin } from '@/gui/utils/dom/getMargin';
import { getWidth, getHeight } from '@/gui/utils/dom/getSize';
import { getStyle } from '@/gui/utils/dom/getStyle';

export namespace getOuter {
  /**
   * Get the outer size of an element.
   * @param el Element to get the outer size of.
   * @returns A object with outer size values as floats.
   */
  export function size(el: _.Optional<_.Stylable>): _.Size | null {
    const style = getStyle(el);
    const width = style && getOuter.width(style);
    const height = width !== null ? getOuter.height(style) : null;
    return width !== null && height !== null ? { width, height } : null;
  }

  /**
   * Get the outer width of an element.
   * @param el Element to get the outer width of.
   * @returns The element outer width as floats.
   */
  export function width(el: _.Optional<_.Stylable>): number | null {
    const style = getStyle(el);
    const width = style && getWidth(style);
    const margin = width !== null ? getMargin.hrz.sum(style) : null;
    return width !== null && margin !== null ? width - margin : null;
  }

  /**
   * Get the outer height of an element.
   * @param el Element to get the outer height of.
   * @returns The element outer height as floats.
   */
  export function height(el: _.Optional<_.Stylable>): number | null {
    const style = getStyle(el);
    const height = style && getHeight(style);
    const margin = height !== null ? getMargin.vrt.sum(style) : null;
    return height !== null && margin !== null ? height - margin : null;
  }
}
