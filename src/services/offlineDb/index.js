import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const DATABASE_NAME = "offlineManager";
const DATABASE_VERSION = 1;

const dbPromise = async () =>
  await openDB(DATABASE_NAME, DATABASE_VERSION, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      switch (oldVersion) {
        case 0: {
          const usersStore = db.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true,
          });
          usersStore.createIndex("username", "username");
          usersStore.createIndex("email", "email");
          db.createObjectStore("logger", {
            keyPath: "id",
            autoIncrement: true,
          });

          db.createObjectStore("temp", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }
    },
  });

class OfflineDBService {
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
    const { id: requestId } = data;
    const db = await dbPromise(this.tablespace);
    const id = await db
      .transaction(this.tablespace, "readwrite")
      .store.add({ ...data, id: requestId || uuidv4() });
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
        ({ id, ...item }) =>
          new Promise((resolve) => {
            resolve(tx.store.add({ ...item, id: id || uuidv4() }));
          })
      )
    );
  };
}

export default OfflineDBService;
