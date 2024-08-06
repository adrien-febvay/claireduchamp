import { _ } from '@/utils/types';

/**
 * Add classes to an element.
 * @param el Element to add classes to.
 * @param className Classes to add.
 */
export function addClass(el: _.Optional<Element>, className: _.Optional<string>): void {
  if (el && className) {
    let currentClassName = ` ${el.className} `;
    const classNames = className.trim().split(/\s+/);
    classNames.forEach((className) => {
      if (!currentClassName.includes(` ${className} `)) {
        currentClassName = `${currentClassName} ${className}`;
      }
    });
    el.className = currentClassName.trim();
  }
}
