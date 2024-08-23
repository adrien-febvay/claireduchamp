import { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { appRender } from '@/be/app/render';
import { Router, resolve } from '@/be/routers/utils';
import { devConsole } from '@/utils/safeConsole';

export const INDEX_FILE = 'index.html';
export const indexPath = resolve('gui', INDEX_FILE);

export async function sendIndex(req: Request, res: Response) {
  const body = await readFile(indexPath, 'utf-8');
  const { content, status } = await appRender(body, req, res);
  res.setHeader('Content-Type', 'text/html');
  res.status(status);
  res.send(content);
}

export const GuiRouter = () =>
  Router((me) => {
    devConsole.log(`Use \x1b[32mrendering\x1b[0m based on \x1b[33m${indexPath}\x1b[0m`);
    me.get('*', (req, res, next) => void sendIndex(req, res).catch(next));
  });
