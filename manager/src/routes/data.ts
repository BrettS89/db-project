import { Router } from 'express';
import axios from 'axios';
import db from '../db';

const router = Router();

router.post('/:id', async (req, res) => {
  const dataObj = {
    data: req.body,
    dependents: [],
  };

  await db.put(req.params.id, dataObj);
  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  const record = db.get(req.params.id);

  const updated = {
    ...record,
    data: req.body,
  };

  await db.put(updated.data.id, updated);

  for (let dep of updated.dependents) {
    await axios.put(`${dep.url}/data/${updated.data.id}`, updated.data);
  }

  res.sendStatus(200);
});

export default router;
