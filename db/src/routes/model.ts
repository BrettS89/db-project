import { Router } from 'express';
import Ajv from 'ajv';
import db from '../db';
import Err from '../utilities/errors';
import { foreignKeys } from '../validation/schemas';

const router = Router();

router.post('/', (req, res) => {
  const ajv = new Ajv({ strict: false });

  try {
    ajv.compile(req.body.schema);
  } catch {
    throw new Err({ code: 400, message: 'Invalid json schema' });
  }

  if (!req.body.name) {
    throw new Err({ code: 400, message: 'Model must include a name' });
  }

  if (req.body.foreignKeys) {
    const valid = ajv.validate(foreignKeys, req.body.foreignKeys);

    if (!valid) {
      throw new Err({ code: 401, message: 'Invalid foreign keys data structure' });
    }
  }

  if (req.body.schema.type !== 'object') {
    throw new Err({ code: 400, message: 'Schema must be of type object' });
  }

  req.body.schema.additionalProperties = false;

  const model = {
    name: req.body.name,
    schema: req.body.schema,
    foreignKeys: req.body.foreignKeys,
  };

  db.setModel(model);

  res.sendStatus(201);
});

export default router;
