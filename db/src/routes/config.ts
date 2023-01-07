import { Router } from 'express';
import db from '../db';
import Err from '../utilities/errors';

const router = Router();

router.post('/', async (req, res) => {
  /*
    body:
      - host
      - port
      - managerUrl
  */

  const port = req.body.port ? `:${req.body.port}` : '';

  await db.configDB.put('url', `${req.body.host}${port}`);

  if (req.body.managerUrl) {
    await db.configDB.put('managerUrl', req.body.managerUrl);
  }
  
  res.sendStatus(200);
});

router.post('/manager', async (req, res) => {
  if (!req.body.managerUrl) {
    throw new Err({ code: 400, message: 'Must include managerUrl' });
  }

  await db.configDB.put('managerUrl', req.body.managerUrl);

  res.sendStatus(201);
});

router.delete('/manager', async (req, res) => {
  await db.configDB.remove('managerUrl');

  res.sendStatus(200);
});


export default router;
