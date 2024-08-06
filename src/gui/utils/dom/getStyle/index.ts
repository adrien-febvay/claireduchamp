import type { _ } from '@/utils/types';

/**
 * Get the computed CSS style of an element.
 * @param el Element to get the computed CSS style of.
 * @returns The CSS style object when applicable, `null` otherwise.
 */
export function getStyle(el: _.Stylable): CSSStyleDeclaration;

export function getStyle(el: _.Nullish): null;

export function getStyle(el: _.Optional<_.Stylable>): CSSStyleDeclaration | null;

export function getStyle(el: _.Optional<_.Stylable>): CSSStyleDeclaration | null {
  if (el instanceof CSSStyleDeclaration) {
    return el;
  } else if (!(el instanceof HTMLElement)) {
    return null;
  } else if (el.offsetParent || document.fullscreenElement === el) {
    return getComputedStyle(el, null);
  } else {
    return null;
  }
}
