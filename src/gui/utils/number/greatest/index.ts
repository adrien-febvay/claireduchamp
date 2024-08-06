const { abs, max, min } = Math;

/**
 * Picks the number with the greatest absolute value.
 * @param ...numbers Numbers to compare.
 * @returns The greatest number provided with its sign preserved (positive value in case of stalemate).
 */
export function greatest(...numbers: number[]): number {
  if (numbers.length <= 1) {
    return numbers[0] ?? NaN;
  } else {
    const lowest = min(...numbers);
    const highest = max(...numbers);
    const delta = lowest === -Infinity && highest === Infinity ? 0 : abs(highest) - abs(lowest);
    return isNaN(delta) ? NaN : delta >= 0 ? highest : lowest;
  }
}
