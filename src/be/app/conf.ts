// Conf loader
import { readFileSync } from 'fs';
import { z } from 'zod';
import { stringifyIssues } from '@/utils/zod/stringifyIssues';

const accessKeyRe = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;
const gtmIdRe = /^GTM-[A-Z\d]{8,}$/;

const guiSchema = z.object({
  gtmId: z.string().regex(gtmIdRe).default(''),
  web3formsAccessKey: z.string().regex(accessKeyRe).default(''),
});

const portSchema = z.number().min(1).max(65535).nullable().optional();

const confSchema = z.object({
  devClientPort: portSchema,
  http: portSchema,
  https: portSchema,
  sslCert: z.string().min(1).nullable().optional(),
  gui: guiSchema,
});

const strictConfSchema = confSchema.strict().extend({ gui: guiSchema.strict() });

export type Conf = z.infer<typeof strictConfSchema>;

const file = `conf/${process.env.NODE_ENV}.json`;

function loadConf() {
  const data: unknown = JSON.parse(readFileSync(file, 'utf8'));
  try {
    const conf = confSchema.parse(data);
    Object.assign(global, { conf: conf.gui });
    try {
      strictConfSchema.parse(data);
    } catch (cause) {
      if (cause instanceof z.ZodError) {
        console.warn(`Configuration warning:\n${file}\n${stringifyIssues(cause).join('\n')}`);
      } else {
        throw cause;
      }
    }
    return conf;
  } catch (cause) {
    if (cause instanceof z.ZodError) {
      console.error(`Invalid configuration:\n${file}\n${stringifyIssues(cause).join('\n')}`);
      process.exit(400);
    } else {
      console.error(`Configuration loading failure: ${file}`);
      throw cause;
    }
  }
}

export const appConf = loadConf();

console.log('Configuration:', file, appConf);
