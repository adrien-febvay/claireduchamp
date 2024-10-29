/* eslint-disable @typescript-eslint/no-wrapper-object-types */

interface ObjectConstructor {
  /**
   * Returns the prototype of an object.
   * @param o The object that references the prototype.
   */
  getPrototypeOf(o: unknown): { [Key in keyof Object]?: unknown } | null;
}
