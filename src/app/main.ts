// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import { Routers } from '@/routers';

// Create app
export const appMain = express();
appMain.use(Cookies());
appMain.use(Routers.Static());
appMain.use(Routers.Main());
appMain.use(Routers.Fallback());
