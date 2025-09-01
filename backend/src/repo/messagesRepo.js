import { prisma } from '../db.js';

export async function saveMessage({ remoteJid, fromMe, body }) {
  return prisma.message.create({ data: { remoteJid, fromMe, body } });
}

export async function getRecentMessages(remoteJid, limit = 5) {
  return prisma.message.findMany({
    where: { remoteJid },
    orderBy: { createdAt: 'desc' },
    take: limit
  });
}
