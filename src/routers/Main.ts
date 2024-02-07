import { Request, Response, NextFunction as Next } from 'express';
import { Router, resolve } from '@/routers/utils';

export const INDEX_FILE = 'index.html';
export const indexPath = resolve('gui', INDEX_FILE);

export function sendIndex(res: Response): void;
export function sendIndex(req: Request, res: Response, next?: Next): void;
export function sendIndex(arg1: Request | Response, arg2?: Response) {
  const res = arg2 ?? (arg1 as Response);
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(indexPath);
}

export const MainRouter = () =>
  Router((me) => {
    me.get('*', sendIndex);
  });
