import { readFileSync } from 'fs';
import { z } from 'zod';
import { safeConsole } from '@/utils/safeConsole';
import { stringifyIssues } from '@/utils/zod/stringifyIssues';

const accessKeyRe = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;
const gtmIdRe = /^GTM-[A-Z\d]{8,}$/;

const guiSchema = z.object({
  gtmId: z.string().regex(gtmIdRe).default(''),
  web3formsAccessKey: z.string().regex(accessKeyRe).default(''),
});

const portSchema = z.number().min(1).max(65535);

const confSchema = z.object({
  devGuiPort: portSchema.default(3000),
  host: z.string().min(1),
  http: portSchema.default(80),
  https: portSchema.nullable().default(443),
  sslCert: z.string().min(1).nullable().optional(),
  gui: guiSchema,
});

const strictConfSchema = confSchema
  .omit(process.env.NODE_ENV === 'production' ? { devGuiPort: true } : {})
  .strict()
  .extend({ gui: guiSchema.strict() });

export type Conf = z.infer<typeof confSchema>;

export type StrictConf = z.infer<typeof strictConfSchema>;

class ConfError extends Error {
  public readonly code?: number;
  public readonly cause?: unknown;

  public constructor(message: string);
  public constructor(code: number, message: string);
  public constructor(cause: { cause: unknown }, message: string);
  public constructor(arg0: string | number | { cause: unknown }, arg1?: string) {
    super(arg1 ?? String(arg0));
    this.code = typeof arg0 === 'number' ? arg0 : typeof arg0 === 'string' ? 0 : 500;
    this.cause = typeof arg0 === 'object' ? arg0 : void 0;
  }
}

export type ParsedConf = { data: Conf; error?: ConfError } | { data: undefined; error: ConfError };

function parseConf(raw: unknown, data?: Conf): ParsedConf;
function parseConf(raw: unknown, data?: Conf): ParsedConf {
  try {
    return { data: data ? strictConfSchema.parse(raw) && data : confSchema.parse(raw) };
  } catch (cause) {
    if (cause instanceof z.ZodError) {
      const code = data ? 0 : 400;
      const message = data ? 'Configuration warning' : 'Invalid configuration';
      return { data, error: new ConfError(code, `${message} in ${file}:\n${stringifyIssues(cause).join('\n')}`) };
    } else {
      return { data, error: new ConfError({ cause }, `Configuration loading failure:\n${file}`) };
    }
  }
}

export type LoadedConf = ParsedConf & {
  file: string;
};

const file = `conf/${process.env.NODE_ENV}.json`;

export function loadConf() {
  const raw: unknown = JSON.parse(readFileSync(file, 'utf8'));
  const parsedConf = parseConf(raw);
  Object.assign(global, { conf: parsedConf.data?.gui });
  return { file, ...(parsedConf.error ? parsedConf : parseConf(raw, parsedConf.data)) };
}

export function loadSafeConf(silent = false) {
  const loadedConf = loadConf();
  if (loadedConf.data) {
    if (!silent) {
      // console.log('Configuration:', loadedConf.file, loadedConf.data);
      if (loadedConf.error) {
        safeConsole.error(loadedConf.error.message);
      }
    }
    return loadedConf.data;
  } else {
    safeConsole.error(loadedConf.error.message);
    if (loadedConf.error.cause) {
      safeConsole.error(loadedConf.error.cause);
    }
    process.exit(loadedConf.error.code);
  }
}
