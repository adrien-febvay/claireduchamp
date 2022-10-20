// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import Routers from '@/routers';
import conf from '../conf/server.json';

// Create app
const app = express();
app.use(Cookies());
app.use(Routers.Static());
app.use(Routers.Main());
app.use(Routers.Fallback());

// Run server
const server = app.listen(conf.http, () => {
  console.log('App served on HTTP:', server.address());
});
