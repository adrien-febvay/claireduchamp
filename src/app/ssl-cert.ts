// SSL certificate loader
import { resolve } from 'path';
import { readFileSync } from 'fs';

export interface SslCert {
  key: string;
  cert: string;
}

function read(ext: string, ...path: string[]): string {
  return readFileSync(`${resolve(...path)}.${ext}`, 'utf8');
}

export function appSslCert(...path: string[]): SslCert {
  try {
    return { key: read('key', ...path), cert: read('crt', ...path) };
  } catch (e) {
    console.error('SSL certification failure');
    throw e;
  }
};
