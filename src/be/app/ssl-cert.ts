// SSL certificate loader
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { App } from '@/be/app';

export type SslCert = Exclude<ReturnType<typeof appSslCert>, null>;

function read(basename: string, ext: string) {
  return readFileSync(resolve('conf', `${basename}.${ext}`), 'utf8');
}

export function appSslCert(basename = App.conf.sslCert) {
  try {
    return basename ? { key: read(basename, 'key'), cert: read(basename, 'crt') } : null;
  } catch (e) {
    console.error('SSL certification failure');
    throw e;
  }
}
