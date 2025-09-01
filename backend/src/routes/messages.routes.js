import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { remoteJid } = req.query;
  const where = remoteJid ? { remoteJid } : {};
  const messages = await prisma.message.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100
  });
  res.json(messages);
});

export default router;
