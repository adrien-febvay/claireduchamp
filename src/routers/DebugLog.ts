import { z } from 'zod';
import { Router } from './utils';

const logSchema = z.object({ message: z.string().min(1), data: z.unknown().optional() });

export const DebugLogRouter = Router((me) => {
  me.post('/debug/log', (req, res) => {
    console.log('\nLog from:', req.headers['x-forwarded-for'] || req.socket.remoteAddress);
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
