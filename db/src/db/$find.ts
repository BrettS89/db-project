import db from '.';
import { Input } from '../interface';

const $find = (input: Input) => {
  const database = db.getDB(input.collection);
  const schema = db.getModel(input.collection);

  if (!database) throw new Error('No db was found');
  if (!schema) throw new Error('no shcmea');

  let ids: string[] = [];

  Object.entries(input.query || {}).forEach(([k, v]) => {
    const values = database.getValues(`${k}.${v}`);
    ids = [...ids, ...values];
  });

  const result = ids.map(id => {
    const record = database.get(id);

    for (let el of schema.foreignKeys || []) {
      if (record[el.field]) {
  
        const joinData = db.joinDB.get(record[el.field]);
  
        if (joinData) record[el.populateToField] = joinData;
      }
    }

    return record;
  });

  return result;
};

export default $find;
