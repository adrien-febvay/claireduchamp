import { onEvent } from '@/gui/hooks/onEvent';

/**
 * Executes a function when the document is fully loaded.
 * @param fn Function to execute.
 */
export function onLoad(fn: () => void): void {
  if (typeof document !== 'undefined') {
    const loading = document.readyState !== 'complete';
    onEvent(loading && window, 'load', fn);
    React.useEffect(() => {
      if (!loading) {
        fn();
      }
    }, []);
  }
}
