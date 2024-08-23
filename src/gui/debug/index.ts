import { safeConsole } from '@/utils/safeConsole';

const devMove = process.env.NODE_ENV === 'development';

const logParameters = {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  method: 'POST',
};

function jsonReplacer(_key: string, value: unknown): unknown {
  if (HTMLElement && value instanceof HTMLElement) {
    const id = value.id ? `#${value.id}` : '';
    const className = value.className ? `.${value.className.replace(/\s+/g, '.')}` : '';
    return `<${value.tagName.toLowerCase()}${id}${className}>`;
  } else {
    return value;
  }
}

export function log(message: string, data?: unknown): void {
  if (devMove) {
    try {
      safeConsole.log('[debug]', message, data);
      const body = JSON.stringify({ message, data }, jsonReplacer);
      fetch('/debug/log', { ...logParameters, body }).catch((cause: unknown) => {
        safeConsole.error('[debug] Failure\n', cause);
      });
    } catch (cause) {
      safeConsole.error('[debug] Invalid data:', data, '\n', cause);
    }
  }
}

const debug = { log };
if (window) {
  Object.assign(window, { debug });
}
safeConsole.log('Custom debug tools available:', debug);
