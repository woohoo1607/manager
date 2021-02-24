import OfflineDBService from "./index";

class OfflineUsersService extends OfflineDBService {
  constructor() {
    super("users");
  }

  synchronization = async (data) => {
    try {
      await this.clearAll();
      await this.import(data);
    } catch (err) {
      throw new Error(err);
    }
  };
}

export const offlineUsersService = new OfflineUsersService();
