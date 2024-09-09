import { mkdirSync, readdirSync, readFileSync } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';
import { dirname, join, sep } from 'path';
import { z } from 'zod';
import { safeConsole } from '@/utils/safeConsole';
import { _ } from '@/utils/types';
import { CacheEntry } from '../CacheEntry';

function getDetails(error: unknown) {
  const rawCode = error instanceof Error && _.object(error)?.code;
  const code = rawCode && typeof rawCode === 'string' ? rawCode : null;
  const details = code ?? ((error instanceof Error && error.message) || 'unknown error');
  return { code, details };
}

export class CacheManager {
  public readonly path: string;
  public readonly data: _.Dict<Data> = {};

  public constructor(path: string, options?: Options) {
    this.path = path;
    mkdirSync(path, { recursive: true });
    const reset = options?.reset ?? process.env.NODE_ENV === 'development';
    if (reset) {
      safeConsole.log('Cache reset');
      this.reset();
    } else if (process.env.PRERENDER !== 'true') {
      safeConsole.log('Cache reload');
      this.reload();
    }
  }

  public get keys() {
    return Object.keys(this.data);
  }

  public entry(...key: string[]) {
    return new CacheEntry(this, ...key);
  }

  public get(key: string) {
    return this.data[key] ?? null;
  }

  public has(key: string) {
    return key in this.data;
  }

  private reload() {
    for (const entry of readdirSync(this.path, { recursive: true, withFileTypes: true })) {
      if (entry.isFile() && /\.json$/.test(entry.name)) {
        const key = entry.name.slice(0, -5).split(sep).join('/');
        try {
          const bytes = readFileSync(join(this.path, entry.name), 'utf-8');
          try {
            const data = JSON.parse(bytes);
            this.data[key] = CacheManager.schema.parse(data);
          } catch (error) {
            const details = error instanceof z.ZodError ? 'wrong data structure' : 'invalid JSON';
            safeConsole.error(`Cannot parse ${entry.name} (${details})`);
          }
        } catch (error) {
          const { details } = getDetails(error);
          safeConsole.error(`Cannot read ${entry.name} (${details})`);
        }
      }
    }
  }

  public remove(...keys: (string | RegExp)[]) {
    const all = keys.includes('*');
    function match(key: string) {
      for (const pattern of keys) {
        if (pattern instanceof RegExp ? pattern.test(key) : pattern === key) {
          return true;
        }
      }
      return false;
    }
    for (const key of this.keys) {
      if (all || match(key)) {
        delete this.data[key];
        const path = `${key.split('/').join(sep)}.json`;
        rm(join(this.path, path)).catch((error) => {
          const { code, details } = getDetails(error);
          if (code !== 'ENOENT') {
            safeConsole.error(`Cannot delete ${path} (${details})`);
          }
        });
      }
    }
  }

  public reset() {
    this.remove('*');
  }

  public set(key: string, data: Data) {
    this.data[key] = data;
    const path = join(this.path, `${key.split('/').join(sep)}.json`);
    mkdir(dirname(path), { recursive: true })
      .then(() => writeFile(path, JSON.stringify(data), 'utf-8'))
      .catch((error) => {
        const { details } = getDetails(error);
        safeConsole.error(`Cannot write ${path} (${details})`);
      });
  }

  public static readonly schema = z.object({
    content: z.string(),
    status: z.number(),
  });
}
