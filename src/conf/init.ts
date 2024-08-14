import fs from 'fs';
import path from 'path';

const resolve = (filename: string) => path.resolve(__dirname, '..', '..', 'conf', filename);

const isErrorWithCode = (val: unknown): val is Error & { code: unknown } => val instanceof Error && 'code' in val;

function copy(source: string, target: string, strict = false) {
  try {
    fs.copyFileSync(resolve(source), resolve(target));
    console.log(`conf/${source}`, '=>', `conf/${target}`);
  } catch (error) {
    if (!isErrorWithCode(error)) {
      throw error;
    } else if (strict || error.code !== 'ENOENT') {
      console.error(`conf/${source}`, '=>', `conf/${target}`);
      console.error(error.message);
      process.exit(2);
    }
  }
}

copy('development.json', 'development.backup.json');
copy('production.json', 'production.backup.json');
copy('development.template.json', 'development.json', true);
copy('production.template.json', 'production.json', true);
