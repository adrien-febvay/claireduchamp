import type { Request } from 'express';

import pretty from 'pretty';
import ReactDOMServer from 'react-dom/server';
import { rmSync } from 'fs';
import { writeFile } from 'fs/promises';
import { Sitemap } from '@/be/sitemap';
import { resolve } from '@/utils/path';
import { safeConsole } from '@/utils/safeConsole';
import { _ } from '@/utils/types';
import EventEmitter from 'events';

const FILENAME = 'sitemap.xml';
const xml = '<?xml version="1.0" encoding="UTF-8"?>';
const xsl = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
const path = ['gui', FILENAME];
const file = resolve(...path);
const alias = ['@', ...path].join('/');

const beSsrOnly = /\bssr-only\b/.test(process.env.BE_MODE ?? '');

if (process.env.NODE_ENV === 'development') {
  try {
    rmSync(file);
  } catch (error) {
    const { code, details } = getDetails(error);
    if (code !== 'ENOENT') {
      safeConsole.error(`Cannot delete ${alias} (${details})`);
    }
  }
}

function getDetails(error: unknown) {
  const rawCode = error instanceof Error && _.object(error)?.code;
  const code = rawCode && typeof rawCode === 'string' ? rawCode : null;
  const details = code ?? ((error instanceof Error && error.message) || 'unknown error');
  return { code, details };
}

export function appSitemap(req: Request) {
  const host = (req.cookies.__forceHost as _.Nullish<string>) ?? req.get('host') ?? req.hostname;
  const protocol = `${req.protocol}:`;
  const content = ReactDOMServer.renderToStaticMarkup(<Sitemap baseurl={`${protocol}//${host}`} />);
  const body = [xml, xsl, pretty(content)].join('\n');
  if (!beSsrOnly) {
    writeFile(file, body, 'utf-8')
      .catch((error) => {
        const { details } = getDetails(error);
        safeConsole.error(`Cannot write ${alias} (${details})`);
      })
      .finally(() => {
        sitemapEmitter.emit('set', `/${FILENAME}`);
      })
      .catch((error) => {
        safeConsole.error(error);
      });
  }
  return body;
}

export const sitemapEmitter = new EventEmitter<{ set: [string] }>();
