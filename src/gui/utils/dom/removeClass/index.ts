import { _ } from '@/utils/types';

/**
 * Remove classes from an element.
 * @param el Element to remove classes from.
 * @param className Classes to remove.
 */
export function removeClass(el: _.Optional<Element>, className: _.Optional<string>): void {
  if (el && className) {
    let currentClassName = ` ${el.className} `;
    const classNames = className.trim().split(/\s+/);
    classNames.forEach((className) => {
      currentClassName = currentClassName.replace(` ${className} `, '');
    });
    el.className = currentClassName;
  }
}
