// HTTP listener
import express from 'express';
import Cookies from 'cookie-parser';
import * as Routers from '@/routers';

// Get port
const port = Number(process.env.PORT ?? 8080);

// Create app
const app = express();
app.use(Cookies());
app.use(Routers.Static());
app.use(Routers.Main());
app.use(Routers.Fallback());

// Run server
const server = app.listen(port, () => {
  console.log('App served on HTTP:', server.address());
});
