import type { useComponent as func } from './useComponent';

declare module 'react' {
  const useComponent: typeof func;
}
