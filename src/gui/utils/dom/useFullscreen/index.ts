import { Fullscreen } from './Fullscreen';

const updaters: Updater[] = [];

/** Broadcasts the fullscreen status change through all subscribed components. */
function broadcast() {
  if (document) {
    for (const updater of updaters) {
      updater(document.fullscreenElement);
    }
  }
}

/**
 * Subscribes to fullscreen status changes,
 * thus rerendering upon fullscreen status change.
 */
export function useFullscreen(element: Fullscreen.Target = { current: document?.documentElement }): Fullscreen {
  const fullscreen = React.useMemo(() => new Fullscreen(element), []);
  const [, setState] = React.useState(fullscreen.active);
  React.useEffect(() => {
    const updater = () => setState(fullscreen.active);
    if (updaters.push(updater) === 1) {
      document?.addEventListener('fullscreenchange', broadcast);
    }
    return () => {
      const index = updaters.indexOf(updater);
      if (index >= 0) {
        updaters.splice(index, 1);
      }
      if (!updaters.length) {
        document?.removeEventListener('fullscreenchange', broadcast);
      }
    };
  });
  return fullscreen;
}
