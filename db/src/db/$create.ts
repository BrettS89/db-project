import db from '.';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Input } from '../interface';

const $create = async (input: Input) => {
  const database = db.getDB(input.collection);
  const schema = db.getModel(input.collection);
  const manager = db.configDB.get('managerUrl');

  if (!database) throw new Error('No db was found');
  if (!schema) throw new Error('no shcmea');

  const id = uuid();

  await database.put(id, { ...input.data, id });

  const promises = Object.entries(input.data!).map(([k, v]) => {
    return database.put(`${k}.${v}`, id);
  });

  await Promise.all(promises);

  const record = database.get(id);

  for (let el of schema.foreignKeys || []) {

    if (input.data![el.field]) {
      const joinData = db.joinDB.get(el.field);

      if (joinData) record[el.populateToField] = joinData;

      else if (manager) {
        const { data } = await axios.post(`${manager}/register-ref/${input.data![el.field]}`, {
          url: db.configDB.get('url'),
        });

        record[el.populateToField] = data;
        await db.joinDB.put(data.id, data);
      }
    }
  }

  if (manager) await axios.post(`${manager}/data/${record.id}`, record);

  return record;
}

export default $create;
