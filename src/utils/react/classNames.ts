/**
 * Generate a className for React.
 * @param classItems:
 * - Class names to include.
 * - Object associating class names to include with true.
 * - Recursive array of the above.
 */
export function classNames(...classItems: Item[]): string | undefined {
  const indexedClasses: Index = {};
  function deepProcess(classItems: Item[]): void {
    for (const item of classItems) {
      if (item instanceof Array) {
        deepProcess(item);
      } else if (item && typeof item === 'object') {
        for (const name in item) {
          indexedClasses[name] = item[name];
        }
      } else if (typeof item === 'string') {
        for (const name of item.split(/\s+/)) {
          indexedClasses[name] = true;
        }
      }
    }
  }
  deepProcess(classItems);
  const classEntries = Object.entries(indexedClasses);
  const activeClasses = classEntries.filter(([name, value]) => name && value);
  return activeClasses.map(([name]) => name).join(' ') || undefined;
}
