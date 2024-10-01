import fs from 'fs';
import { resolve } from '@/utils/path';
import { safeConsole } from '@/utils/safeConsole';

const resolveConfFile = (filename: string) => resolve('..', 'conf', filename);

const isErrorWithCode = (val: unknown): val is Error & { code: unknown } => val instanceof Error && 'code' in val;

function copy(source: string, target: string, strict = false) {
  try {
    fs.copyFileSync(resolveConfFile(source), resolveConfFile(target));
    safeConsole.log(`conf/${source}`, '=>', `conf/${target}`);
  } catch (error) {
    if (!isErrorWithCode(error)) {
      throw error;
    } else if (strict || error.code !== 'ENOENT') {
      safeConsole.error(`conf/${source}`, '=>', `conf/${target}`);
      safeConsole.error(error.message);
      process.exit(2);
    }
  }
}

copy('development.json', 'development.backup.json');
copy('production.json', 'production.backup.json');
copy('development.template.json', 'development.json', true);
copy('production.template.json', 'production.json', true);
