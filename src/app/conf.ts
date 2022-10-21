// Conf loader
import { resolve } from 'path';
import { readFileSync } from 'fs';

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
  return isInteger(val) && val > 0 && val < 65536;
}

function loadConf(...path: string[]): Conf {
  try {
    const bytes = readFileSync(resolve(...path, 'server.json'), 'utf8');
    const conf: unknown = JSON.parse(bytes);
    if (!isObject(conf)) {
      throw `Expected object, got ${xtype(conf)}`;
    } else {
      const { http, https, 'ssl-cert': sslCert, ...unknown } = conf;
      if (!isPort(http)) {
        throw `Expected \`http\` to be a port, got ${xntype(http)}`;
      } else if (!isPort(https)) {
        throw `Expected \`https\` to be a port, got ${xntype(http)}`;
      } else if (typeof sslCert !== 'string' || sslCert === '') {
        throw `Expected \`ssl-cert\` to be a path, got ${xtype(sslCert)}`;
      } else if (Object.keys(unknown).length) {
        const keys = Object.keys(unknown).map((key) => JSON.stringify(key));
        throw `Unexpected parameters: ${keys.join(', ')}`;
      }
      return { http, https, 'ssl-cert': sslCert };
    }
  } catch (err) {
    console.error('Configuration loading failure');
    throw typeof err === 'string' ? new TypeError(err) : err;
  }
};

export const appConf = loadConf();
