import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const DATABASE_NAME = "manager";
const DATABASE_VERSION = 3;

const dbPromise = async () =>
  await openDB(DATABASE_NAME, DATABASE_VERSION, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      switch (oldVersion) {
        case 0: {
          const store = db.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("username", "username");
        }
        // eslint-disable-next-line no-fallthrough
        case 1: {
          transaction.objectStore("users").createIndex("email", "email");
          db.createObjectStore("temp", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        // eslint-disable-next-line no-fallthrough
        case 2: {
          const store = db.createObjectStore("logger", {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("isSuccess", "isSuccess");
        }
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }
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
    const id = await db
      .transaction(this.tablespace, "readwrite")
      .store.add({ ...data, id: uuidv4() });
    return await this.getByID(id);
  };

  put = async ({ id, ...data }) => {
    const db = await dbPromise(this.tablespace);
    await db
      .transaction(this.tablespace, "readwrite")
      .store.put({ ...data, id });
    return await this.getByID(id);
  };

  delete = async (id) => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.delete(id);
  };

  clearAll = async () => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.clear();
  };

  getFromIndex = async ({ index, query }) => {
    const db = await dbPromise(this.tablespace);
    return await db.getFromIndex(this.tablespace, index, query);
  };

  import = async (data) => {
    const db = await dbPromise(this.tablespace);
    const tx = db.transaction(this.tablespace, "readwrite");
    return await Promise.all(
      data.map(
        (item) =>
          new Promise((resolve) => {
            resolve(tx.store.add({ ...item, id: uuidv4() }));
          })
      )
    );
  };
}

export default DBService;
