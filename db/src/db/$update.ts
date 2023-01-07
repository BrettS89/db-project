import db from '.';
import axios from 'axios';
import { Input } from '../interface';

const $update = async (input: Input) => {
  const database = db.getDB(input.collection);
  const schema = db.getModel(input.collection);
  const manager = db.configDB.get('managerUrl');

  if (!database) throw new Error('No db was found');
  if (!schema) throw new Error('no shcmea');

  const record = database.get(input.id!);

  const updated = {
    ...record,
    ...input.data,
  };

  await database.put(updated.id, updated);

  if (manager) await axios.put(`${manager}/data/${updated.id}`, updated);

  return updated;
}

export default $update;
