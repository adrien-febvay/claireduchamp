import { getStyle } from '@/gui/utils/dom/getStyle';
import { _ } from '@/utils/types';

/**
 * Get the size of an element.
 * @param el Element to get the size of.
 * @returns A object with size values as floats.
 */
export function getSize(el: _.Optional<_.Stylable>): _.Size | null {
  const style = getStyle(el);
  const width = style && getWidth(style);
  const height = width !== null ? getHeight(style) : null;
  return width !== null && height !== null ? { width, height } : null;
}

/**
 * Get the width of an element.
 * @param el Element to get the width of.
 * @returns The element width as floats.
 */
export function getWidth(el: _.Optional<_.Stylable>): number | null {
  const style = getStyle(el);
  const width = style && Number.parseFloat(style.width);
  return width === null || isNaN(width) ? null : width;
}

/**
 * Get the height of an element.
 * @param el Element to get the height of.
 * @returns The element height as floats.
 */
export function getHeight(el: _.Optional<_.Stylable>): number | null {
  const style = getStyle(el);
  const height = style && Number.parseFloat(style.height);
  return height === null || isNaN(height) ? null : height;
}
