declare module 'path-validation' {
  function isAbsolutePath(str: string, dirSeparator?: string): boolean;
  function isAbsoluteLinuxPath(str: string): boolean;
  function isAbsoluteWindowsPath(str: string): boolean;
}
