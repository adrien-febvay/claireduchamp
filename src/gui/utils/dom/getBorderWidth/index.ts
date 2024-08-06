import { _ } from '@/utils/types';

import { getStyle } from '@/gui/utils/dom/getStyle';

/**
 * Get border sizes of an element.
 * @param el Element to get the border sizes of.
 * @param edges Edges to get the border size of, by default all.
 * @returns A object with the border sizes as floats.
 */
export function getBorderWidth(el: _.Optional<_.Stylable>, edges: readonly _.Edge[] = _.Edge.names): _.Edges | null {
  const style = getStyle(el);
  if (style) {
    const border = {} as _.Edges;
    for (const key of edges) {
      const value = style.getPropertyValue(`border-${key}-width`);
      border[key] = Number.parseFloat(value);
      if (isNaN(border[key])) {
        return null;
      }
    }
    return border;
  } else {
    return null;
  }
}

export namespace getBorderWidth {
  /**
   * Get the horizontal border sizes of an element.
   * @param el Element to get the border sizes of.
   * @returns A object with the border sizes as floats.
   */
  export function hrz(el: _.Optional<_.Stylable>): _.Edges.H | null {
    return getBorderWidth(el, _.Edge.H.names);
  }

  export namespace hrz {
    /**
     * Get the horizontal border size of an element.
     * @param el Element to get the border size of.
     * @returns The border size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const border = hrz(el);
      return border && border.left + border.right;
    }
  }

  /**
   * Get the vertical border sizes of an element.
   * @param el Element to get the border sizes of.
   * @returns A object with the border sizes as floats.
   */
  export function vrt(el: _.Optional<_.Stylable>): _.Edges.V | null {
    return getBorderWidth(el, _.Edge.V.names);
  }

  export namespace vrt {
    /**
     * Get the vertical border size of an element.
     * @param el Element to get the border size of.
     * @returns The border size as float.
     */
    export function sum(el: _.Optional<_.Stylable>): number | null {
      const border = vrt(el);
      return border && border.top + border.bottom;
    }
  }
}
