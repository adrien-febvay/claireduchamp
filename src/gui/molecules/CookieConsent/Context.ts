import { createContext } from 'react';

/** Dialog context. For internal use only. Use `<DialogProvider>` and `useDialog()` instead. */
export const CookieConsentContext = createContext<CookieConsentContext>([]);
