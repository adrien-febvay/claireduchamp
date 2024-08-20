import type { Context as Component } from '.';

declare module '.' {
  namespace Context {
    type Location = {
      /** Location object's URL's host and port (if different from the default port for the scheme). */
      readonly host: string;

      /** Location object's URL's host. */
      readonly hostname: string;

      /**Location object's URL. */
      readonly href: string;

      /** Location object's URL's path. */
      readonly pathname: string;

      /** Location object's URL's port. */
      readonly port: string;

      /** Location object's URL's scheme. */
      readonly protocol: string;

      /** Location object's URL's query (includes leading "?" if non-empty). */
      readonly search: string;
    };

    /** Context value. */
    type Value = React.Children.Prop & {
      device: {
        desktop: boolean;
        mobile: boolean;
        responsive: boolean;
      };
      lang?: string;
      location: Location;
      status?: number;
    };
  }

  /** Location. */
  type Location = Component.Location;

  /** Context value. */
  type Value = Component.Value;
}
