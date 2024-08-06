/**
 * Ensures a number is between a minimum and a maximum.
 * @param n Number to fix.
 * @param min Minimum value.
 * @param max Maximum value.
 * @returns The fixed number.
 */
export function between(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
