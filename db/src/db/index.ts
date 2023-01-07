import lmdb, { open } from 'lmdb';
import { Model } from '../interface';

class Db {
  configDB: lmdb.RootDatabase<any, lmdb.Key>;
  schemaDB: lmdb.RootDatabase<any, lmdb.Key>;
  joinDB: lmdb.RootDatabase<any, lmdb.Key>;
  dbs: Record<string, lmdb.RootDatabase<any, lmdb.Key>> = {};

  constructor() {
    this.schemaDB = open({
      path: 'schema-db',
    });

    this.joinDB = open({
      path: 'join-db',
    });

    this.configDB = open({
      path: 'config-db',
    });
  }

  init() {
    this.schemaDB.getKeys().forEach((key: any) => {
      this.dbs![key] = open({ path: `collection/${key}` });
    });
  }

  getDB(collectionName: string): lmdb.RootDatabase<any, lmdb.Key> | undefined {
    return this.dbs[collectionName];
  }

  getModel(collectionName: string) {
    return this.schemaDB.get(collectionName);
  }

  setModel(model: Model) {
    this.schemaDB.put(model.name, model);
    this.dbs![model.name] = open({ path: `collection/${model.name}` });
  }
}

export default new Db();
