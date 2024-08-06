/**
 * Pads a number with non-significative zeros.
 * @param num Maximum number in the series.
 * @param size Maximum number in the series.
 * @returns The padded number as a string.
 */
export function pad(num: number, size: number): string {
  const str = num.toString();
  return isNaN(num) ? str : Array(size - str.length + 1).join('0') + str;
}

export namespace pad {
  /**
   * Pads a number with non-significative zeros
   * according to the size of the maximum number in the series.
   * @param max Maximum number in the series.
   * @returns A function that pads numbers accordingly.
   */
  export function accordingTo(max: number): (num: number) => string {
    const size = max.toString().length;
    return (num: number) => pad(num, size);
  }
}
