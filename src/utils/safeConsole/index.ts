/* eslint-disable @typescript-eslint/unbound-method */
const voidFunction = process.env.NODE_ENV !== 'development' ? (): void => void 0 : null;

export const safeConsole = console;

export const devConsole = {
  error: voidFunction ?? safeConsole.error,
  log: voidFunction ?? safeConsole.log,
  warn: voidFunction ?? safeConsole.log,
};
