import type { Request } from 'express';

import pretty from 'pretty';
import ReactDOMServer from 'react-dom/server';
import { writeFile } from 'fs/promises';
import { Sitemap } from '@/be/sitemap';
import { resolve } from '@/utils/path';
import { safeConsole } from '@/utils/safeConsole';
import { _ } from '@/utils/types';

const xml = '<?xml version="1.0" encoding="UTF-8"?>';
const xsl = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
const file = resolve('gui', 'sitemap.xml');

function getDetails(error: unknown) {
  const rawCode = error instanceof Error && _.object(error)?.code;
  const code = rawCode && typeof rawCode === 'string' ? rawCode : null;
  const details = code ?? ((error instanceof Error && error.message) || 'unknown error');
  return { code, details };
}

export function appSitemap(req: Request) {
  const host = req.get('host') ?? req.hostname;
  const protocol = `${req.protocol}:`;
  const content = ReactDOMServer.renderToStaticMarkup(<Sitemap baseurl={`${protocol}//${host}`} />);
  const body = [xml, xsl, pretty(content)].join('\n');
  writeFile(file, body, 'utf-8').catch((error) => {
    const { details } = getDetails(error);
    safeConsole.error(`Cannot write ${file} (${details})`);
  });
  return body;
}
