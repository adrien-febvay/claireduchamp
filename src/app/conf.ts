// Conf loader
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { isAbsolutePath } from 'path-validation';

export interface Conf {
  'http': number;
  'https': number;
  'ssl-cert': string;
}

function xntype(val: unknown): string {
  if (typeof val === 'number') {
    return val.toString();
  } else {
    return xtype(val);
  }
}

function xtype(val: unknown): string {
  if (val instanceof Array) {
    return `array(${val.length})`;
  } else if (val === null) {
    return 'null'
  } else if (typeof val === 'string') {
    return `string(${val.length})`;
  } else {
    return typeof val;
  }
}

function isObject(val: unknown): val is Record<string, unknown> {
  return val && typeof val === 'object';
}

function isInteger(val: unknown): val is number {
  return typeof val === "number" && Number.isInteger(val);
}

function isPort(val: unknown): val is number {
  return isInteger(val) && val >= 0 && val < 65536;
}

function isString(val: unknown): val is string {
  return val && typeof val === 'string';
}

function typeError(key: string, type: string, input: string): TypeError {
  const message = `Expected \`${key}\` to be a valid ${type}, got ${input}`;
  return new TypeError(message);
}

function loadConf(): Conf {
  try {
    const bytes = readFileSync('conf/server.json', 'utf8');
    const conf: unknown = JSON.parse(bytes);
    if (!isObject(conf)) {
      throw new TypeError(`Expected object, got ${xtype(conf)}`);
    } else {
      const { http, https, 'ssl-cert': sslCert, ...unknown } = conf;
      const resolvedSslCert = isString(sslCert) && resolve('conf', sslCert);
      if (!isPort(http)) {
        throw typeError('http', 'port', xntype(http));
      } else if (!isPort(https)) {
        throw typeError('https', 'port', xntype(https));
      } else if (!resolvedSslCert) {
        throw typeError('sslCert', 'path', xtype(sslCert));
      } else if (!isAbsolutePath(resolvedSslCert)) {
        throw typeError('sslCert', 'path', JSON.stringify(sslCert));
      } else if (Object.keys(unknown).length) {
        const keys = Object.keys(unknown).map((key) => JSON.stringify(key));
        throw new TypeError(`Unexpected parameters: ${keys.join(', ')}`);
      } else {
        return { http, https, 'ssl-cert': resolvedSslCert };
      }
    }
  } catch (err) {
    console.error('Configuration loading failure');
    throw err;
  }
};

export const appConf = loadConf();

console.log('Configuration:', appConf);
