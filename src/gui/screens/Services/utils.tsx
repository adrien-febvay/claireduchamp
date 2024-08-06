/**
 * Splits a list of items into groups.
 * @param list String where items are separated by a semi-column.
 * @returns An array of groups, a group being an array of items.
 */
export function splitItems(list: string): string[][] {
  const items = list.split(/\s*;\s*/);
  const groups: string[][] = [];
  for (let index = 0; index < items.length; index += 3) {
    groups.push(items.slice(index, index + 3));
  }
  return groups;
}
