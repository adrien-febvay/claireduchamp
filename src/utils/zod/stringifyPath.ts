export function stringifyPath(path: (string | number)[]): string {
  const keys = path.map((key) => {
    const strKey = String(key);
    if (/^(0|[1-9]\d*)$/.test(strKey)) {
      return `[${strKey}]`;
    } else if (/^[^\W\d]\w*$/.test(strKey)) {
      return `.${strKey}`;
    } else {
      return `[${JSON.stringify(strKey)}]`;
    }
  });
  return keys.join('');
}
