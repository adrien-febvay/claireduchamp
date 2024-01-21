import { z } from 'zod';
import { Router } from './utils';

const logSchema = z.object({ message: z.string().min(1), data: z.unknown().optional() });

function getTime(): string {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export const DebugLogRouter = Router((me) => {
  me.post('/debug/log', (req, res) => {
    const from = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('\nLog at', getTime(), 'from:', from);
    console.log('Agent:', req.headers['user-agent']);
    try {
      const body = logSchema.parse(req.body);
      console.log('Message:', body.message);
      console.log('Data:', JSON.stringify(body.data, null, 2));
    } catch (cause) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    res.send();
  });
});
