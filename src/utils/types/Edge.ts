import '.';

declare module '.' {
  namespace _ {
    /** Any edge. */
    type Edge = (typeof Edge.names)[number];

    namespace Edge {
      /** Horizontal edge. */
      type H = (typeof H.names)[number];

      /** Vertical edge. */
      type V = (typeof V.names)[number];
    }

    /** All edges, or only those which `Name` is specified. */
    type Edges<Name extends Edge = Edge> = { [Key in Name]: number };

    namespace Edges {
      /** Horizontal edges. */
      type H = { [Key in Edge.H]: number };

      /** Vertical edges. */
      type V = { [Key in Edge.V]: number };
    }
  }
}

const H = {
  /** Horizontal edge names. */
  names: ['left', 'right'] as const,
};

const V = {
  /** Vertical edge names. */
  names: ['top', 'bottom'] as const,
};

export const Edge = {
  H,
  V,

  /** All edge names. */
  names: [...V.names, ...H.names] as const,
};
