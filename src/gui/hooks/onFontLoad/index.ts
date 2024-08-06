import type { onFontLoad as My } from '.';
import type { Memo } from './types';

import { onEvent } from '@/gui/hooks/onEvent';

const unresolvedStatuses = ['unregistered', 'loading', 'unloaded'] as const;
const allStatuses = ['untracked', ...unresolvedStatuses, 'loaded', 'error'] as const;

function findFontFace(font: My.Font): My.Font.Face {
  if (typeof document !== 'undefined' && document.fonts) {
    fontLoop: for (const fontFace of document.fonts) {
      for (const prop of onFontLoad.fontProps) {
        if (font[prop] && font[prop] !== fontFace[prop]) {
          continue fontLoop;
        }
      }
      return fontFace;
    }
    return { ...font, status: 'unregistered' };
  } else {
    return { ...font, status: 'untracked' };
  }
}

/**
 * Executes a function when the document is fully loaded.
 * @param fn Function to execute.
 */
export function onFontLoad(
  fontInit: My.Font.Initializer,
  eventType: My.Font.Event.Type.Arg,
  cb?: My.Callback,
): My.ReturnType {
  const memo = React.useMemo(initMemo, []);

  const { init, state } = memo;
  const toggleLoadingListener = init.loading && onEvent(state.loading, 'loading', checkFont);
  const toggleLoadedListener = init.loaded && onEvent(state.loaded, 'loadingdone', checkFont);
  const toggleErrorListener = init.error && onEvent(state.error, 'loadingerror', checkFont);

  React.useEffect(checkFont, []);

  function checkFont(event?: Event): void {
    const { status } = getFontFace();
    if (state[status]) {
      const resolvedStatus = !unresolvedStatuses.includes(status);
      for (const status of resolvedStatus ? allStatuses : unresolvedStatuses) {
        state[status] = null;
      }
      cb?.(memo.fontFace, event);
      if (memo.setStatus) {
        memo.setStatus?.(status);
      } else if (resolvedStatus) {
        toggleLoadingListener?.(false);
        toggleLoadedListener?.(false);
        toggleErrorListener?.(false);
      } else if (status === 'loading') {
        toggleLoadingListener?.(false);
      }
    }
  }

  function getFontFace(): My.Font.Face {
    if (memo.fontFace.status === 'unregistered') {
      memo.fontFace = findFontFace(memo.font);
    }
    return memo.fontFace;
  }

  function initMemo(): Memo {
    const font = fontInit instanceof Function ? fontInit() : fontInit;
    const fontFace = findFontFace(font);

    const untracked = typeof document === 'undefined' || !document.fonts;
    const tracked = !untracked;

    const event = eventType instanceof Array ? eventType : [eventType];
    const allEvent = tracked && (event.includes('all') || event.includes('*'));
    const resolvedEvent = tracked && (allEvent || event.includes('resolved'));
    const unresolvedEvent = tracked && (allEvent || event.includes('unresolved'));

    const loadingEvent = tracked && (unresolvedEvent || event.includes('loading'));
    const loadedEvent = tracked && (resolvedEvent || event.includes('loaded'));
    const errorEvent = tracked && (resolvedEvent || event.includes('error'));

    const loaded = fontFace.status === 'loaded';
    const error = fontFace.status === 'error';
    const unresolved = fontFace.status !== 'untracked' && !(loaded || error);

    const init = {
      loading: (loadingEvent && fontFace.status === 'unregistered') || null,
      loaded: (loadedEvent && unresolved) || null,
      error: (errorEvent && unresolved) || null,
    };

    const state = {
      untracked: (untracked && (event.includes('resolved') || event.includes('untracked'))) || null,
      unregistered: (tracked && (unresolvedEvent || event.includes('unregistered'))) || null,
      loading: loadingEvent && unresolved ? document.fonts : null,
      loaded: loadedEvent && (unresolved || loaded) ? document.fonts : null,
      error: loadedEvent && (unresolved || error) ? document.fonts : null,
      unloaded: true as const,
    };

    const ret = [fontFace, !unresolved] as const;
    Object.defineProperties(ret, { 0: { get: useFontFace }, 1: { get: useResolved } });

    return { font, fontFace, init, ret, state };
  }

  function useFontFace(): My.Font.Face {
    useStatus();
    return memo.fontFace;
  }

  function useResolved(): boolean {
    useStatus();
    return !unresolvedStatuses.includes(memo.fontFace.status);
  }

  function useStatus(): void {
    if (!memo.setStatus) {
      memo.setStatus = React.useState(memo.fontFace.status)[1];
    }
  }

  memo.setStatus = void 0;
  return memo.ret;
}

export namespace onFontLoad {
  export const fontProps = [
    'ascentOverride',
    'descentOverride',
    'display',
    'family',
    'featureSettings',
    'lineGapOverride',
    'stretch',
    'style',
    'unicodeRange',
    'weight',
  ] as const;

  export namespace Font {
    export type Status = (typeof allStatuses)[number];
  }
}
