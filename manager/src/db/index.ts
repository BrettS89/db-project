import lmdb, { open } from 'lmdb';

class Db {
  private db?: lmdb.RootDatabase<any, lmdb.Key>;

  init() {
    this.db = open({
      path: 'app-db',
      compression: true,
    });
  }

  get(key: string) {
    return this.db!.get(key);
  }

  async put(key: string, data: any) {
    await this.db!.put(key, data);
    return this.db!.get(key);
  }
}

export default new Db();
