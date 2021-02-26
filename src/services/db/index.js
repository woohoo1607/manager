import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";
import { checkConnection } from "../../api";

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
          await db.createObjectStore("temp", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        // eslint-disable-next-line no-fallthrough
        case 2: {
          db.deleteObjectStore("temp");
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

  serverRequestSimulator = async (method, parameters) => {
    try {
      await checkConnection();
      const db = await dbPromise(this.tablespace);
      if (method === "getFromIndex") {
        const { index, query } = parameters;
        return await db.getFromIndex(this.tablespace, index, query);
      } else {
        return await db
          .transaction(this.tablespace, "readwrite")
          .store[method](parameters);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByID = async (id) => {
    return await this.serverRequestSimulator("get", id);
  };

  getAll = async () => {
    return await this.serverRequestSimulator("getAll");
  };

  add = async (data) => {
    const { id: requestId } = data;
    const id = await this.serverRequestSimulator("add", {
      ...data,
      id: requestId || uuidv4(),
    });
    return await this.getByID(id);
  };

  put = async ({ id, ...data }) => {
    await this.serverRequestSimulator("put", { ...data, id });
    return await this.getByID(id);
  };

  delete = async (id) => {
    return await this.serverRequestSimulator("delete", id);
  };

  clearAll = async () => {
    const db = await dbPromise(this.tablespace);
    return await db.transaction(this.tablespace, "readwrite").store.clear();
  };

  getFromIndex = async ({ index, query }) => {
    return await this.serverRequestSimulator("getFromIndex", { index, query });
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
