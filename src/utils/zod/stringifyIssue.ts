import type { z } from 'zod';

import { stringifyPath } from './stringifyPath';

export function stringifyIssue(issue: z.ZodIssue, prefix = '  '): string {
  const path = stringifyPath(issue.path);
  return `${prefix}${path}${path && ': '}${issue.message}`;
}
