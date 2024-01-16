import type { z } from 'zod';

import { stringifyIssue } from './stringifyIssue';

type Issues = z.ZodIssue[] | Pick<z.ZodError, 'issues'>;

export function stringifyIssues(issues: Issues, prefix = '  '): string[] {
  const actualIssues = issues instanceof Array ? issues : issues.issues;
  return actualIssues.map((issue) => stringifyIssue(issue, prefix));
}
