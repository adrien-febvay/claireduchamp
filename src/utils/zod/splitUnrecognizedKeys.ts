import type { z } from 'zod';

const unexpectedKey = (...path: z.ZodIssue['path']) => ({ code: 'custom', path, message: 'Unexpected key' }) as const;
const unexpectedKeys = ({ keys, path }: z.ZodUnrecognizedKeysIssue) => keys.map((key) => unexpectedKey(...path, key));

export function splitUnrecognizedKeys(issues: z.ZodIssue[]): z.ZodIssue[] {
  return issues.map((issue) => (issue.code === 'unrecognized_keys' ? unexpectedKeys(issue) : issue)).flat(1);
}
