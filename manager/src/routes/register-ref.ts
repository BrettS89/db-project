import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/:id', async (req, res) => {
  const record = db.get(req.params.id);

  if (!record) {
    res.status(401).json({ message: 'no record was found with this id' });
    return;
  }

  record.dependents.push({
    url: req.body.url,
  });

  await db.put(record.data.id, record);

  res.status(200).json(record.data);
});

export default router;
