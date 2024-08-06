/**
 * Pads a number with non-significative zeros.
 * @param max Maximum number in the series.
 * @returns A function that pads numbers accordingly.
 */
export function padFor(max: number): (n: number) => string {
  const len = max.toString().length + 1;
  return (n: number) => {
    const str = n.toString();
    return Array(len - str.length).join('0') + str;
  };
}
