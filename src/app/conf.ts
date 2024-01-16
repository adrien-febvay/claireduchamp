// Conf loader
import { readFileSync } from 'fs';
import { z } from 'zod';
import { stringifyIssues } from '@/utils/zod/stringifyIssues';

const confSchema = z.object({
  http: z.number().min(1).max(65535).nullable().optional(),
  https: z.number().min(1).max(65535).nullable().optional(),
  proxy: z.string().min(1).nullable().optional(),
});

function loadConf() {
  const data: unknown = JSON.parse(readFileSync('conf/server.json', 'utf8'));
  try {
    const conf = confSchema.parse(data);
    try {
      confSchema.strict().parse(data);
    } catch (cause) {
      if (cause instanceof z.ZodError) {
        console.warn(`Configuration warning:\n${stringifyIssues(cause).join('\n')}`);
      } else {
        throw cause;
      }
    }
    return conf;
  } catch (cause) {
    if (cause instanceof z.ZodError) {
      console.error(`Invalid configuration:\n${stringifyIssues(cause).join('\n')}`);
      process.exit(400);
    } else {
      console.error('Configuration loading failure');
      throw cause;
    }
  }
}

export const appConf = loadConf();

console.log('Configuration:', appConf);
