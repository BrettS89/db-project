import db from '.';
import { Input } from '../interface';

const $get = (input: Input) => {
  const database = db.getDB(input.collection);
  const schema = db.getModel(input.collection);

  if (!database) throw new Error('No db was found');
  if (!schema) throw new Error('no shcmea');

  const record = database.get(input.id!);

  for (let el of schema.foreignKeys || []) {
    if (record[el.field]) {

      const joinData = db.joinDB.get(record[el.field]);

      if (joinData) record[el.populateToField] = joinData;

    }
  }

  return record;
}

export default $get;
