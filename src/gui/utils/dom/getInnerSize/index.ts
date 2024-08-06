import type { _ } from '@/utils/types';

import { getBorderWidth } from '@/gui/utils/dom/getBorderWidth';
import { getPadding } from '@/gui/utils/dom/getPadding';
import { getWidth, getHeight } from '@/gui/utils/dom/getSize';
import { getStyle } from '@/gui/utils/dom/getStyle';

export namespace getInner {
  /**
   * Get the inner size of an element.
   * @param el Element to get the inner size of.
   * @returns A object with inner size values as floats.
   */
  export function size(el: _.Optional<_.Stylable>): _.Size | null {
    const style = getStyle(el);
    const width = style && getInner.width(style);
    const height = width !== null ? getInner.height(style) : null;
    return width !== null && height !== null ? { width, height } : null;
  }

  /**
   * Get the inner width of an element.
   * @param el Element to get the inner width of.
   * @returns The element inner width as floats.
   */
  export function width(el: _.Optional<_.Stylable>): number | null {
    const style = getStyle(el);
    const width = style && getWidth(style);
    const border = width !== null ? getBorderWidth.hrz.sum(style) : null;
    const padding = border !== null ? getPadding.hrz.sum(style) : null;
    return width !== null && border !== null && padding !== null ? width - border - padding : null;
  }

  /**
   * Get the inner height of an element.
   * @param el Element to get the inner height of.
   * @returns The element inner height as floats.
   */
  export function height(el: _.Optional<_.Stylable>): number | null {
    const style = getStyle(el);
    const height = style && getHeight(style);
    const border = height !== null ? getBorderWidth.vrt.sum(style) : null;
    const padding = border !== null ? getPadding.vrt.sum(style) : null;
    return height !== null && border !== null && padding !== null ? height - border - padding : null;
  }
}
