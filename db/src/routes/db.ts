import { Router } from 'express';
import Ajv from 'ajv';
import Err from '../utilities/errors';
import $create from '../db/$create';
import $get from '../db/$get';
import $update from '../db/$update';
import $find from '../db/$find';
import { $getSchema } from '../validation/schemas';
import db from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const ajv = new Ajv({ strict: false });

  if (req.body.method === '$find') {
    const records = $find(req.body);

    res.status(200).json(records);
  } else if (req.body.method === '$get') {
    const valid = ajv.validate($getSchema, req.body);

    if (!valid) {
      throw new Err({ code: 401, message: 'Invalid foreign keys data structure' });
    }

    const record = $get(req.body);
    res.status(200).json(record);

  } else if (req.body.method === '$create') {
    if (!req.body.collection) throw new Err({ code: 400, message: 'Must specify collection' });

    const model = db.schemaDB.get(req.body.collection);

    if (!model) throw new Err({ code: 400, message: 'No model was found for this collection' });

    const valid = ajv.validate(model.schema, req.body.data);

    if (!valid) throw new Err({ code: 401, message: 'Invalid payload' });

    const record = await $create(req.body);

    res.status(201).json(record);

  } else if (req.body.method === '$update') {
    if (!req.body.id) {
      throw new Err({
        code: 400,
        message: 'Must include an id for resource to update'
      });
    }

    if (!req.body.collection) {
      throw new Err({ code: 400, message: 'Must specify collection' });
    }

    const model = db.schemaDB.get(req.body.collection);

    if (!model) {
      throw new Err({ code: 400, message: 'No model was found for this collection' });
    }

    const updateSchema = {
      ...model.schema,
      required: [],
      additionalProperties: false
    };

    const valid = ajv.validate(updateSchema, req.body.data);

    if (!valid) throw new Err({ code: 401, message: 'Invalid payload' });

    const updated = await $update(req.body);
    res.status(200).json(updated);

  } else {
    res.sendStatus(500);
  }

});

export default router;
