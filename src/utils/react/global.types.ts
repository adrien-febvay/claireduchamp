import type ReactImport from 'react';
import type { React as CustomReact } from '.';

declare global {
  /** Customized React module. */
  type React = typeof CustomReact;

  /** React's `<Fragment>` (shortcut). */
  const Fragment: typeof ReactImport.Fragment;
}
