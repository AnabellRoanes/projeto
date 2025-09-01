import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import statusRoutes from './routes/status.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import { createWhatsapp } from './whatsapp.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', statusRoutes);
app.use('/api/messages', messagesRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

createWhatsapp(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend on http://localhost:${PORT}`);
});
