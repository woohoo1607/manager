import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const DATABASE_NAME = "manager";
const DATABASE_VERSION = 1;

const dbPromise = async ({ tablespace }) =>
  await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      db.createObjectStore(tablespace, {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });

class DBService {
  constructor(tablespace) {
    this.tablespace = tablespace;
  }

  getByID = async (id) => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.get(id);
  };

  getAll = async () => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.getAll();
  };

  add = async (data) => {
    const db = await dbPromise(this.tablespace);
    return await db
      .transaction(this.tablespace, "readwrite")
      .store.add({ ...data, id: uuidv4() });
  };

  put = async (data) => {
    const db = await dbPromise(this.tablespace);
    return await db
      .transaction(this.tablespace, "readwrite")
      .store.put({ ...data, id: uuidv4() });
  };

  delete = async (id) => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.delete(id);
  };

  clearAll = async () => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.clear();
  };
}

export default DBService;
