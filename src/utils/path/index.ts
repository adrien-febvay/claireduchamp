import { dirname, resolve as resolvePath } from 'path';

export const projectDir = dirname(process.argv[1] as string);

export function resolve(...path: string[]) {
  return resolvePath(projectDir, ...path);
}
