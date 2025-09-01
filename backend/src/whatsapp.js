import pkg from 'whatsapp-web.js';
const {Client, LocalAuth} = pkg; 

// import {Client, LocalAuth} from 'whatsapp-web.js' // const { Client, LocalAuth } = require ('whatsapp-web.js');
import QRCode from 'qrcode'; //  const {QRCOD} = require ('qrcode'); 
import { saveMessage, getRecentMessages } from './repo/messagesRepo.js'; // const {saveMessage, getRecentMessages} = require ('./repo/messagesRepo.js');
import { generateReply } from './ia.js'; // const {generateReply} = require ('./ia.js');

export function createWhatsapp(io) {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
  });

  client.on('qr', async (qr) => {
    io.emit('wa:qr', { qr, dataURL: await QRCode.toDataURL(qr) });
  });

  client.on('ready', () => {
    io.emit('wa:status', { status: 'ready' });
  });

  client.on('disconnected', (reason) => {
    io.emit('wa:status', { status: 'disconnected', reason });
  });

  client.on('message', async (msg) => {
    const remoteJid = msg.from;
    const body = msg.body || '';
    await saveMessage({ remoteJid, fromMe: false, body });

    const context = await getRecentMessages(remoteJid, 4);
    const reply = await generateReply(body, context);

    await client.sendMessage(remoteJid, reply);
    await saveMessage({ remoteJid, fromMe: true, body: reply });
  });

  client.initialize();
  return client;
}
