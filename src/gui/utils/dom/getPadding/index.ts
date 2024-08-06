import { _ } from '@/utils/types';

import { getStyle } from '@/gui/utils/dom/getStyle';

/**
 * Get the padding sizes of an element.
 * @param el Element to get the padding sizes of.
 * @param edges Edges to get the padding size of, by default all.
 * @returns A object with the padding sizes as floats.
 */
export function getPadding(el: _.Optional<_.Stylable>, edges: readonly _.Edge[] = _.Edge.names): _.Edges | null {
  const style = getStyle(el);
  if (style) {
    const padding = {} as _.Edges;
    for (const key of edges) {
      const value = style.getPropertyValue(`padding-${key}`);
      padding[key] = Number.parseFloat(value);
      if (isNaN(padding[key])) {
        return null;
      }
    }
    return padding;
  } else {
    return null;
  }
}

export namespace getPadding {
  /**
   * Get the horizontal padding sizes of an element.
   * @param el Element to get the padding sizes of.
   * @returns A object with the padding sizes as floats.
   */
  export function hrz(el: _.Optional<_.Stylable>): _.Edges.H | null {
    return getPadding(el, _.Edge.H.names);
  }

  export namespace hrz {
    /**
     * Get the horizontal padding size of an element.
     * @param el Element to get the padding size of.
     * @returns The padding size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const padding = hrz(el);
      return padding && padding.left + padding.right;
    }
  }

  /**
   * Get the vertical padding sizes of an element.
   * @param el Element to get the padding sizes of.
   * @returns A object with the padding sizes as floats.
   */
  export function vrt(el: _.Optional<_.Stylable>): _.Edges.V | null {
    return getPadding(el, _.Edge.V.names);
  }

  export namespace vrt {
    /**
     * Get the vertical padding size of an element.
     * @param el Element to get the padding size of.
     * @returns The padding size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const padding = vrt(el);
      return padding && padding.top + padding.bottom;
    }
  }
}
