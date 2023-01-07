import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/:id', async (req, res) => {
  await db.joinDB.put(req.params.id, req.body);

  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  await db.joinDB.put(req.params.id, req.body);
  res.sendStatus(200);
});

export default router;
