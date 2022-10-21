// SSL certificate loader
import { readFileSync } from 'fs';
import { App } from '@/app';

export interface SslCert {
  key: string;
  cert: string;
}

function read(basename: string, ext: string): string {
  return readFileSync(`${basename}.${ext}`, 'utf8');
}

export function appSslCert(basename = App.conf['ssl-cert']): SslCert {
  try {
    return { key: read(basename, 'key'), cert: read(basename, 'crt') };
  } catch (e) {
    console.error('SSL certification failure');
    throw e;
  }
};
